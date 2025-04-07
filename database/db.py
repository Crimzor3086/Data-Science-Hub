import sqlite3
import hashlib
import os
import secrets
from datetime import datetime, timedelta

class Database:
    def __init__(self, db_path='database/auth.db'):
        self.db_path = db_path
        self.ensure_db_exists()

    def ensure_db_exists(self):
        """Ensure database and tables exist"""
        if not os.path.exists('database'):
            os.makedirs('database')
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Read and execute schema.sql
        with open('database/schema.sql', 'r') as f:
            schema = f.read()
            cursor.executescript(schema)
        
        conn.commit()
        conn.close()

    def get_connection(self):
        """Get database connection"""
        return sqlite3.connect(self.db_path)

    def hash_password(self, password):
        """Hash password using SHA-256 with salt"""
        salt = secrets.token_hex(16)
        return hashlib.sha256((password + salt).encode()).hexdigest(), salt

    def verify_password(self, password, stored_hash, salt):
        """Verify password against stored hash"""
        return hashlib.sha256((password + salt).encode()).hexdigest() == stored_hash

    def create_user(self, name, email, password):
        """Create new user"""
        password_hash, salt = self.hash_password(password)
        
        conn = self.get_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute('''
                INSERT INTO users (name, email, password_hash)
                VALUES (?, ?, ?)
            ''', (name, email, password_hash + ':' + salt))
            
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            return False
        finally:
            conn.close()

    def authenticate_user(self, email, password):
        """Authenticate user"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, password_hash FROM users 
            WHERE email = ? AND is_active = 1
        ''', (email,))
        
        result = cursor.fetchone()
        conn.close()
        
        if not result:
            return None
        
        user_id, stored_hash = result
        stored_hash, salt = stored_hash.split(':')
        
        if self.verify_password(password, stored_hash, salt):
            return user_id
        return None

    def create_session(self, user_id):
        """Create new session for user"""
        token = secrets.token_hex(32)
        expires_at = datetime.now() + timedelta(days=7)
        
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO sessions (user_id, session_token, expires_at)
            VALUES (?, ?, ?)
        ''', (user_id, token, expires_at))
        
        conn.commit()
        conn.close()
        return token

    def validate_session(self, token):
        """Validate session token"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_id FROM sessions 
            WHERE session_token = ? AND expires_at > datetime('now')
        ''', (token,))
        
        result = cursor.fetchone()
        conn.close()
        
        return result[0] if result else None

    def record_login_attempt(self, email, ip_address, successful):
        """Record login attempt"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO login_attempts (email, ip_address, is_successful)
            VALUES (?, ?, ?)
        ''', (email, ip_address, successful))
        
        conn.commit()
        conn.close()

    def create_password_reset_token(self, email):
        """Create password reset token"""
        token = secrets.token_hex(32)
        expires_at = datetime.now() + timedelta(hours=1)
        
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
        user_id = cursor.fetchone()
        
        if user_id:
            cursor.execute('''
                INSERT INTO password_reset_tokens (user_id, token, expires_at)
                VALUES (?, ?, ?)
            ''', (user_id[0], token, expires_at))
            
            conn.commit()
            conn.close()
            return token
        
        conn.close()
        return None

    def validate_reset_token(self, token):
        """Validate password reset token"""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_id FROM password_reset_tokens 
            WHERE token = ? AND expires_at > datetime('now') AND is_used = 0
        ''', (token,))
        
        result = cursor.fetchone()
        conn.close()
        
        return result[0] if result else None

    def update_password(self, user_id, new_password):
        """Update user password"""
        password_hash, salt = self.hash_password(new_password)
        
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE users 
            SET password_hash = ?
            WHERE id = ?
        ''', (password_hash + ':' + salt, user_id))
        
        conn.commit()
        conn.close() 