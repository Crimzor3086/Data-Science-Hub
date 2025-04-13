from http.server import BaseHTTPRequestHandler
import json
import jwt
import os
import hashlib
import secrets
from datetime import datetime, timedelta
from urllib.parse import parse_qs

# Mock database for demonstration
# In a real application, you would use a database service like MongoDB Atlas, Firebase, or Supabase
users = [
    {
        "id": "1",
        "name": "Enoch Osenwafulah",
        "email": "enochosenwafulah@gmail.com",
        "password_hash": hashlib.sha256(("e2n3o4c50987#$" + "salt").encode()).hexdigest() + ":salt",
        "role": "ADMIN",
        "is_active": True
    }
]

# JWT secret key
JWT_SECRET = os.environ.get("JWT_SECRET", "your-secret-key")

class handler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        if self.path == '/api/auth/login':
            self.handle_login(data)
        elif self.path == '/api/auth/register':
            self.handle_register(data)
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())

    def handle_login(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Email and password are required"}).encode())
            return
        
        # Find user by email
        user = next((u for u in users if u['email'] == email), None)
        
        if not user:
            self._set_headers(401)
            self.wfile.write(json.dumps({"error": "Invalid credentials"}).encode())
            return
        
        # Verify password
        stored_hash, salt = user['password_hash'].split(':')
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        
        if password_hash != stored_hash:
            self._set_headers(401)
            self.wfile.write(json.dumps({"error": "Invalid credentials"}).encode())
            return
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user['id'],
            'email': user['email'],
            'role': user['role'],
            'exp': datetime.utcnow() + timedelta(days=1)
        }, JWT_SECRET, algorithm='HS256')
        
        # Return user data and token
        user_data = {
            'id': user['id'],
            'name': user['name'],
            'email': user['email'],
            'role': user['role']
        }
        
        self._set_headers(200)
        self.wfile.write(json.dumps({
            "token": token,
            "user": user_data
        }).encode())

    def handle_register(self, data):
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'STUDENT')
        
        if not all([name, email, password]):
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Name, email, and password are required"}).encode())
            return
        
        # Check if email already exists
        if any(u['email'] == email for u in users):
            self._set_headers(400)
            self.wfile.write(json.dumps({"error": "Email already registered"}).encode())
            return
        
        # Create new user
        salt = secrets.token_hex(16)
        password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        
        new_user = {
            "id": str(len(users) + 1),
            "name": name,
            "email": email,
            "password_hash": password_hash + ":" + salt,
            "role": role,
            "is_active": True
        }
        
        users.append(new_user)
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': new_user['id'],
            'email': new_user['email'],
            'role': new_user['role'],
            'exp': datetime.utcnow() + timedelta(days=1)
        }, JWT_SECRET, algorithm='HS256')
        
        # Return user data and token
        user_data = {
            'id': new_user['id'],
            'name': new_user['name'],
            'email': new_user['email'],
            'role': new_user['role']
        }
        
        self._set_headers(201)
        self.wfile.write(json.dumps({
            "token": token,
            "user": user_data
        }).encode()) 