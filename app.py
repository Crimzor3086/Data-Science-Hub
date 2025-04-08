from flask import Flask, request, jsonify, make_response, redirect, session, url_for, render_template
from database.db import Database
from auth.email_service import EmailService
import os
from datetime import datetime, timedelta
from auth.oauth_handler import OAuthHandler
from functools import wraps
import jwt

app = Flask(__name__)
app.secret_key = os.urandom(24)
db = Database()
email_service = EmailService()
oauth_handler = OAuthHandler()

# Admin authentication middleware
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            payload = jwt.decode(token, app.secret_key, algorithms=['HS256'])
            if payload.get('role') != 'admin':
                return jsonify({'error': 'Admin access required'}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email already exists
    if db.get_user_by_email(data['email']):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create user
    user_id = db.create_user(
        name=data['name'],
        email=data['email'],
        password=data['password']
    )
    if not user_id:
        return jsonify({'error': 'Failed to create user'}), 500
    
    # Create verification token and send email
    verification_token = db.create_verification_token(user_id)
    if email_service.send_verification_email(data['email'], verification_token):
        return jsonify({
            'message': 'Account created successfully. Please check your email to verify your account.'
        }), 201
    else:
        return jsonify({
            'message': 'Account created, but verification email could not be sent. Please contact support.'
        }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ('email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user_id = db.authenticate_user(
        email=data['email'],
        password=data['password']
    )
    
    if user_id:
        # Record successful login attempt
        db.record_login_attempt(
            email=data['email'],
            ip_address=request.remote_addr,
            successful=True
        )
        
        # Create session
        session_token = db.create_session(user_id)
        
        response = make_response(jsonify({'message': 'Login successful'}))
        response.set_cookie(
            'session_token',
            session_token,
            httponly=True,
            secure=True,
            samesite='Strict',
            expires=datetime.now() + timedelta(days=7)
        )
        return response
    
    # Record failed login attempt
    db.record_login_attempt(
        email=data['email'],
        ip_address=request.remote_addr,
        successful=False
    )
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session_token = request.cookies.get('session_token')
    if session_token:
        response = make_response(jsonify({'message': 'Logged out successfully'}))
        response.set_cookie('session_token', '', expires=0)
        return response
    return jsonify({'error': 'Not logged in'}), 401

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400
    
    token = db.create_password_reset_token(data['email'])
    
    if token:
        # In a real application, you would send an email with the reset link
        return jsonify({'message': 'Password reset email sent'}), 200
    else:
        return jsonify({'error': 'Email not found'}), 404

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not all(k in data for k in ('token', 'new_password')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user_id = db.validate_reset_token(data['token'])
    
    if user_id:
        db.update_password(user_id, data['new_password'])
        return jsonify({'message': 'Password updated successfully'}), 200
    else:
        return jsonify({'error': 'Invalid or expired token'}), 400

@app.route('/auth/google')
def google_auth():
    auth_url = oauth_handler.get_google_auth_url()
    return redirect(auth_url)

@app.route('/auth/google/callback')
def google_callback():
    code = request.args.get('code')
    if not code:
        return redirect(url_for('login', error='No code provided'))
    return oauth_handler.handle_google_callback(code)

@app.route('/auth/github')
def github_auth():
    auth_url = oauth_handler.get_github_auth_url()
    return redirect(auth_url)

@app.route('/auth/github/callback')
def github_callback():
    code = request.args.get('code')
    if not code:
        return redirect(url_for('login', error='No code provided'))
    return oauth_handler.handle_github_callback(code)

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return "Welcome to your dashboard!"

@app.route('/logout')
def logout():
    if 'session_token' in session:
        db.invalidate_session(session['session_token'])
    session.clear()
    return redirect(url_for('login'))

@app.route('/verify-email')
def verify_email():
    token = request.args.get('token')
    if not token:
        return render_template('verification_error.html', 
                             message='No verification token provided')
    
    # Check rate limit for verification attempts
    allowed, message = db.check_rate_limit(
        ip_address=request.remote_addr,
        action_type='verify_email',
        max_attempts=5,  # 5 attempts per hour
        window_minutes=60,
        block_hours=24
    )
    if not allowed:
        return render_template('verification_error.html', 
                             message=message)
        
    if db.verify_email(token):
        # Clear rate limits on successful verification
        db.clear_rate_limits(ip_address=request.remote_addr, 
                           action_type='verify_email')
        return render_template('verification_success.html')
    else:
        return render_template('verification_error.html', 
                             message='Invalid or expired verification token')

@app.route('/resend-verification', methods=['POST'])
def resend_verification():
    email = request.form.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400
        
    # Check rate limit
    allowed, message = db.check_rate_limit(
        ip_address=request.remote_addr,
        action_type='resend_verification',
        max_attempts=3,  # 3 attempts per hour
        window_minutes=60,
        block_hours=24
    )
    if not allowed:
        return jsonify({'error': message}), 429
        
    user = db.get_user_by_email(email)
    if not user:
        return jsonify({'error': 'Email not found'}), 404
        
    if db.is_email_verified(user['id']):
        return jsonify({'error': 'Email already verified'}), 400
        
    # Create new verification token
    verification_token = db.create_verification_token(user['id'])
    if email_service.send_verification_email(email, verification_token):
        return jsonify({'message': 'Verification email sent successfully'}), 200
    else:
        return jsonify({'error': 'Failed to send verification email'}), 500

# Admin login endpoint
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    # Verify admin credentials (you should use proper password hashing)
    if username == 'admin' and password == 'admin123':  # Change these credentials
        token = jwt.encode({
            'username': username,
            'role': 'admin',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.secret_key)
        
        return jsonify({'token': token}), 200
    
    return jsonify({'error': 'Invalid credentials'}), 401

# User management endpoints
@app.route('/api/admin/users', methods=['GET'])
@admin_required
def get_users():
    try:
        users = db.get_all_users()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users/<int:user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    try:
        db.delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Course management endpoints
@app.route('/api/admin/courses', methods=['GET'])
@admin_required
def get_courses():
    try:
        courses = db.get_all_courses()
        return jsonify(courses), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/courses/<int:course_id>', methods=['DELETE'])
@admin_required
def delete_course(course_id):
    try:
        db.delete_course(course_id)
        return jsonify({'message': 'Course deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Blog management endpoints
@app.route('/api/admin/blog', methods=['GET'])
@admin_required
def get_blog_posts():
    try:
        posts = db.get_all_blog_posts()
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/blog/<int:post_id>', methods=['DELETE'])
@admin_required
def delete_blog_post(post_id):
    try:
        db.delete_blog_post(post_id)
        return jsonify({'message': 'Blog post deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Service management endpoints
@app.route('/api/admin/services', methods=['GET'])
@admin_required
def get_services():
    try:
        services = db.get_all_services()
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/services/<int:service_id>', methods=['DELETE'])
@admin_required
def delete_service(service_id):
    try:
        db.delete_service(service_id)
        return jsonify({'message': 'Service deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Search endpoints
@app.route('/api/admin/search/users', methods=['GET'])
@admin_required
def search_users():
    query = request.args.get('q', '')
    filter = request.args.get('filter', 'all')
    try:
        users = db.search_users(query, filter)
        return jsonify(users), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/search/courses', methods=['GET'])
@admin_required
def search_courses():
    query = request.args.get('q', '')
    filter = request.args.get('filter', 'all')
    try:
        courses = db.search_courses(query, filter)
        return jsonify(courses), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/search/blog', methods=['GET'])
@admin_required
def search_blog_posts():
    query = request.args.get('q', '')
    filter = request.args.get('filter', 'all')
    try:
        posts = db.search_blog_posts(query, filter)
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/search/services', methods=['GET'])
@admin_required
def search_services():
    query = request.args.get('q', '')
    filter = request.args.get('filter', 'all')
    try:
        services = db.search_services(query, filter)
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 