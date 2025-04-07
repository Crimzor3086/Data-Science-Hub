import sqlite3

class DatabaseHandler:
    def __init__(self):
        self.conn = sqlite3.connect('data_science_hub.db')
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        # ... existing table creation code ...

        # Admin-related tables
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                admin_id INTEGER,
                action TEXT,
                target_type TEXT,
                target_id INTEGER,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (admin_id) REFERENCES users(id)
            )
        ''')

        self.conn.commit()

    # User Management
    def get_all_users(self):
        self.cursor.execute('''
            SELECT id, username, email, role, status, created_at
            FROM users
            ORDER BY created_at DESC
        ''')
        return self.cursor.fetchall()

    def delete_user(self, user_id):
        self.cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
        self.conn.commit()

    def search_users(self, query, filter='all'):
        sql = '''
            SELECT id, username, email, role, status, created_at
            FROM users
            WHERE (username LIKE ? OR email LIKE ?)
        '''
        params = [f'%{query}%', f'%{query}%']
        
        if filter != 'all':
            sql += ' AND status = ?'
            params.append(filter)
        
        sql += ' ORDER BY created_at DESC'
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    # Course Management
    def get_all_courses(self):
        self.cursor.execute('''
            SELECT id, title, level, instructor, price, status, created_at
            FROM courses
            ORDER BY created_at DESC
        ''')
        return self.cursor.fetchall()

    def delete_course(self, course_id):
        self.cursor.execute('DELETE FROM courses WHERE id = ?', (course_id,))
        self.conn.commit()

    def search_courses(self, query, filter='all'):
        sql = '''
            SELECT id, title, level, instructor, price, status, created_at
            FROM courses
            WHERE (title LIKE ? OR instructor LIKE ?)
        '''
        params = [f'%{query}%', f'%{query}%']
        
        if filter != 'all':
            sql += ' AND level = ?'
            params.append(filter)
        
        sql += ' ORDER BY created_at DESC'
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    # Blog Management
    def get_all_blog_posts(self):
        self.cursor.execute('''
            SELECT id, title, author, content, status, created_at
            FROM blog_posts
            ORDER BY created_at DESC
        ''')
        return self.cursor.fetchall()

    def delete_blog_post(self, post_id):
        self.cursor.execute('DELETE FROM blog_posts WHERE id = ?', (post_id,))
        self.conn.commit()

    def search_blog_posts(self, query, filter='all'):
        sql = '''
            SELECT id, title, author, content, status, created_at
            FROM blog_posts
            WHERE (title LIKE ? OR author LIKE ? OR content LIKE ?)
        '''
        params = [f'%{query}%', f'%{query}%', f'%{query}%']
        
        if filter != 'all':
            sql += ' AND status = ?'
            params.append(filter)
        
        sql += ' ORDER BY created_at DESC'
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    # Service Management
    def get_all_services(self):
        self.cursor.execute('''
            SELECT id, name, description, price, status, created_at
            FROM services
            ORDER BY created_at DESC
        ''')
        return self.cursor.fetchall()

    def delete_service(self, service_id):
        self.cursor.execute('DELETE FROM services WHERE id = ?', (service_id,))
        self.conn.commit()

    def search_services(self, query, filter='all'):
        sql = '''
            SELECT id, name, description, price, status, created_at
            FROM services
            WHERE (name LIKE ? OR description LIKE ?)
        '''
        params = [f'%{query}%', f'%{query}%']
        
        if filter != 'all':
            sql += ' AND status = ?'
            params.append(filter)
        
        sql += ' ORDER BY created_at DESC'
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    # Admin Logging
    def log_admin_action(self, admin_id, action, target_type, target_id):
        self.cursor.execute('''
            INSERT INTO admin_logs (admin_id, action, target_type, target_id)
            VALUES (?, ?, ?, ?)
        ''', (admin_id, action, target_type, target_id))
        self.conn.commit()

    def get_admin_logs(self, admin_id=None):
        sql = '''
            SELECT l.id, u.username, l.action, l.target_type, l.target_id, l.timestamp
            FROM admin_logs l
            JOIN users u ON l.admin_id = u.id
        '''
        params = []
        
        if admin_id:
            sql += ' WHERE l.admin_id = ?'
            params.append(admin_id)
        
        sql += ' ORDER BY l.timestamp DESC'
        self.cursor.execute(sql, params)
        return self.cursor.fetchall()

    def __del__(self):
        self.conn.close() 