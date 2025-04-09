import sqlite3

class DatabaseHandler:
    def __init__(self):
        self.conn = sqlite3.connect('data_science_hub.db')
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        # ... existing table creation code ...

        # Courses table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                level TEXT NOT NULL,
                instructor TEXT NOT NULL,
                price REAL NOT NULL,
                duration TEXT NOT NULL,
                pdf_path TEXT,
                status TEXT DEFAULT 'active',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        # Course details table
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS course_details (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id INTEGER NOT NULL,
                description TEXT,
                learning_objectives TEXT,
                prerequisites TEXT,
                syllabus TEXT,
                FOREIGN KEY (course_id) REFERENCES courses(id)
            )
        ''')

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
            SELECT id, title, level, instructor, price, duration, pdf_path, status, created_at
            FROM courses
            WHERE status = 'active'
            ORDER BY created_at DESC
        ''')
        columns = [col[0] for col in self.cursor.description]
        return [dict(zip(columns, row)) for row in self.cursor.fetchall()]

    def get_course_by_id(self, course_id):
        self.cursor.execute('''
            SELECT id, title, level, instructor, price, duration, pdf_path, status, created_at
            FROM courses
            WHERE id = ? AND status = 'active'
        ''', (course_id,))
        columns = [col[0] for col in self.cursor.description]
        row = self.cursor.fetchone()
        return dict(zip(columns, row)) if row else None

    def get_course_details(self, course_id):
        self.cursor.execute('''
            SELECT description, learning_objectives, prerequisites, syllabus
            FROM course_details
            WHERE course_id = ?
        ''', (course_id,))
        columns = [col[0] for col in self.cursor.description]
        row = self.cursor.fetchone()
        return dict(zip(columns, row)) if row else {}

    def create_course(self, title, level, instructor, price, duration, pdf_path=None):
        self.cursor.execute('''
            INSERT INTO courses (title, level, instructor, price, duration, pdf_path)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (title, level, instructor, price, duration, pdf_path))
        self.conn.commit()
        return self.cursor.lastrowid

    def create_course_details(self, course_id, description=None, learning_objectives=None, prerequisites=None, syllabus=None):
        self.cursor.execute('''
            INSERT INTO course_details (course_id, description, learning_objectives, prerequisites, syllabus)
            VALUES (?, ?, ?, ?, ?)
        ''', (course_id, description, learning_objectives, prerequisites, syllabus))
        self.conn.commit()

    def update_course(self, course_id, title=None, level=None, instructor=None, price=None, duration=None, pdf_path=None):
        update_fields = []
        params = []
        
        if title is not None:
            update_fields.append('title = ?')
            params.append(title)
        if level is not None:
            update_fields.append('level = ?')
            params.append(level)
        if instructor is not None:
            update_fields.append('instructor = ?')
            params.append(instructor)
        if price is not None:
            update_fields.append('price = ?')
            params.append(price)
        if duration is not None:
            update_fields.append('duration = ?')
            params.append(duration)
        if pdf_path is not None:
            update_fields.append('pdf_path = ?')
            params.append(pdf_path)
        
        if update_fields:
            params.append(course_id)
            self.cursor.execute(f'''
                UPDATE courses
                SET {', '.join(update_fields)}
                WHERE id = ?
            ''', params)
            self.conn.commit()

    def update_course_details(self, course_id, description=None, learning_objectives=None, prerequisites=None, syllabus=None):
        update_fields = []
        params = []
        
        if description is not None:
            update_fields.append('description = ?')
            params.append(description)
        if learning_objectives is not None:
            update_fields.append('learning_objectives = ?')
            params.append(learning_objectives)
        if prerequisites is not None:
            update_fields.append('prerequisites = ?')
            params.append(prerequisites)
        if syllabus is not None:
            update_fields.append('syllabus = ?')
            params.append(syllabus)
        
        if update_fields:
            params.append(course_id)
            self.cursor.execute(f'''
                UPDATE course_details
                SET {', '.join(update_fields)}
                WHERE course_id = ?
            ''', params)
            self.conn.commit()

    def delete_course(self, course_id):
        self.cursor.execute('UPDATE courses SET status = "inactive" WHERE id = ?', (course_id,))
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