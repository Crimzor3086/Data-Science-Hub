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

    def create_verification_token(self, user_id):
        """Create a new email verification token."""
        token = secrets.token_urlsafe(32)
        expires_at = datetime.now() + timedelta(hours=24)
        
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO email_verification (user_id, verification_token, expires_at)
            VALUES (?, ?, ?)
        ''', (user_id, token, expires_at))
        conn.commit()
        conn.close()
        return token

    def verify_email(self, token):
        """Verify email using the token."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_id, expires_at
            FROM email_verification
            WHERE verification_token = ? AND is_verified = 0
        ''', (token,))
        result = cursor.fetchone()
        
        if not result:
            return False
            
        user_id, expires_at = result
        if datetime.now() > datetime.strptime(expires_at, '%Y-%m-%d %H:%M:%S'):
            return False
            
        # Mark as verified
        cursor.execute('''
            UPDATE email_verification
            SET is_verified = 1
            WHERE verification_token = ?
        ''', (token,))
        
        # Update user's email verification status
        cursor.execute('''
            UPDATE users
            SET is_verified = 1
            WHERE id = ?
        ''', (user_id,))
        
        conn.commit()
        conn.close()
        return True

    def is_email_verified(self, user_id):
        """Check if a user's email is verified."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT is_verified
            FROM users
            WHERE id = ?
        ''', (user_id,))
        result = cursor.fetchone()
        conn.close()
        return result[0] if result else False

    def check_rate_limit(self, ip_address, action_type, max_attempts=5, window_minutes=60, block_hours=24):
        """Check if an action is rate limited."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        # Check for existing block
        cursor.execute('''
            SELECT is_blocked, block_expires_at
            FROM rate_limits
            WHERE ip_address = ? AND action_type = ? AND is_blocked = 1
        ''', (ip_address, action_type))
        result = cursor.fetchone()
        
        if result:
            is_blocked, expires_at = result
            if datetime.now() < datetime.strptime(expires_at, '%Y-%m-%d %H:%M:%S'):
                conn.close()
                return False, f"Too many attempts. Please try again after {expires_at}"
            else:
                # Unblock if expired
                cursor.execute('''
                    UPDATE rate_limits
                    SET is_blocked = 0, block_expires_at = NULL
                    WHERE ip_address = ? AND action_type = ?
                ''', (ip_address, action_type))
        
        # Check attempt count
        cursor.execute('''
            SELECT attempt_count, last_attempt
            FROM rate_limits
            WHERE ip_address = ? AND action_type = ?
        ''', (ip_address, action_type))
        result = cursor.fetchone()
        
        if result:
            count, last_attempt = result
            time_diff = datetime.now() - datetime.strptime(last_attempt, '%Y-%m-%d %H:%M:%S')
            
            if time_diff.total_seconds() < window_minutes * 60:
                if count >= max_attempts:
                    # Block the IP
                    block_expires = datetime.now() + timedelta(hours=block_hours)
                    cursor.execute('''
                        UPDATE rate_limits
                        SET is_blocked = 1, block_expires_at = ?
                        WHERE ip_address = ? AND action_type = ?
                    ''', (block_expires, ip_address, action_type))
                    conn.commit()
                    conn.close()
                    return False, f"Too many attempts. IP blocked for {block_hours} hours."
                
                # Increment attempt count
                cursor.execute('''
                    UPDATE rate_limits
                    SET attempt_count = attempt_count + 1,
                        last_attempt = CURRENT_TIMESTAMP
                    WHERE ip_address = ? AND action_type = ?
                ''', (ip_address, action_type))
            else:
                # Reset attempt count if window expired
                cursor.execute('''
                    UPDATE rate_limits
                    SET attempt_count = 1,
                        last_attempt = CURRENT_TIMESTAMP
                    WHERE ip_address = ? AND action_type = ?
                ''', (ip_address, action_type))
        else:
            # Create new rate limit entry
            cursor.execute('''
                INSERT INTO rate_limits (ip_address, action_type)
                VALUES (?, ?)
            ''', (ip_address, action_type))
        
        conn.commit()
        conn.close()
        return True, None

    def clear_rate_limits(self, ip_address=None, action_type=None):
        """Clear rate limits for an IP or action type."""
        conn = self.get_connection()
        cursor = conn.cursor()
        
        if ip_address and action_type:
            cursor.execute('''
                DELETE FROM rate_limits
                WHERE ip_address = ? AND action_type = ?
            ''', (ip_address, action_type))
        elif ip_address:
            cursor.execute('''
                DELETE FROM rate_limits
                WHERE ip_address = ?
            ''', (ip_address,))
        elif action_type:
            cursor.execute('''
                DELETE FROM rate_limits
                WHERE action_type = ?
            ''', (action_type,))
        
        conn.commit()
        conn.close() 