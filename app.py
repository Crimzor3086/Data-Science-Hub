from flask import Flask, request, jsonify, make_response, redirect, session, url_for
from database.db import Database
import os
from datetime import datetime, timedelta
from auth.oauth_handler import OAuthHandler

app = Flask(__name__)
app.secret_key = os.urandom(24)
db = Database()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    if not all(k in data for k in ('name', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    success = db.create_user(
        name=data['name'],
        email=data['email'],
        password=data['password']
    )
    
    if success:
        return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'error': 'Email already exists'}), 400

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
    auth_url = OAuthHandler.get_google_auth_url()
    return redirect(auth_url)

@app.route('/auth/google/callback')
def google_callback():
    code = request.args.get('code')
    if not code:
        return redirect(url_for('login', error='No code provided'))

    try:
        access_token = OAuthHandler.get_google_token(code)
        user_info = OAuthHandler.get_google_user_info(access_token)
        
        # Create or update user in database
        user = db.create_or_update_user(
            email=user_info['email'],
            name=user_info.get('name', ''),
            provider='google',
            provider_id=user_info['sub']
        )
        
        # Create session
        session_token = db.create_session(user['id'])
        session['user_id'] = user['id']
        session['session_token'] = session_token
        
        return redirect(url_for('dashboard'))
    except Exception as e:
        return redirect(url_for('login', error=str(e)))

@app.route('/auth/github')
def github_auth():
    auth_url = OAuthHandler.get_github_auth_url()
    return redirect(auth_url)

@app.route('/auth/github/callback')
def github_callback():
    code = request.args.get('code')
    if not code:
        return redirect(url_for('login', error='No code provided'))

    try:
        access_token = OAuthHandler.get_github_token(code)
        user_info = OAuthHandler.get_github_user_info(access_token)
        email = OAuthHandler.get_github_user_email(access_token)
        
        # Create or update user in database
        user = db.create_or_update_user(
            email=email,
            name=user_info.get('name', user_info['login']),
            provider='github',
            provider_id=str(user_info['id'])
        )
        
        # Create session
        session_token = db.create_session(user['id'])
        session['user_id'] = user['id']
        session['session_token'] = session_token
        
        return redirect(url_for('dashboard'))
    except Exception as e:
        return redirect(url_for('login', error=str(e)))

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

if __name__ == '__main__':
    app.run(debug=True) 