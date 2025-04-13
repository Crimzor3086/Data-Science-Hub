import sqlite3
import os
import hashlib
import secrets
from datetime import datetime, timedelta

def reset_database():
    # Remove existing database files
    db_files = ['database/auth.db', 'data_science_hub.db']
    for db_file in db_files:
        if os.path.exists(db_file):
            os.remove(db_file)
            print(f"Removed {db_file}")

    # Create database directory if it doesn't exist
    if not os.path.exists('database'):
        os.makedirs('database')

    # Initialize auth database
    conn = sqlite3.connect('database/auth.db')
    cursor = conn.cursor()

    # Read and execute schema.sql
    with open('database/schema.sql', 'r') as f:
        schema = f.read()
        cursor.executescript(schema)

    # Create default admin user
    password = "admin123"  # Default password
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    
    cursor.execute('''
        INSERT INTO users (name, email, password_hash, is_active)
        VALUES (?, ?, ?, ?)
    ''', ('Admin User', 'admin@example.com', password_hash + ':' + salt, 1))

    # Create default student user
    password = "student123"  # Default password
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    
    cursor.execute('''
        INSERT INTO users (name, email, password_hash, is_active)
        VALUES (?, ?, ?, ?)
    ''', ('Student User', 'student@example.com', password_hash + ':' + salt, 1))

    conn.commit()
    conn.close()

    # Initialize main database
    conn = sqlite3.connect('data_science_hub.db')
    cursor = conn.cursor()

    # Create tables
    cursor.executescript('''
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
        );

        CREATE TABLE IF NOT EXISTS course_details (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            description TEXT,
            learning_objectives TEXT,
            prerequisites TEXT,
            syllabus TEXT,
            FOREIGN KEY (course_id) REFERENCES courses(id)
        );

        CREATE TABLE IF NOT EXISTS admin_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin_id INTEGER,
            action TEXT,
            target_type TEXT,
            target_id INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS blog_posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ''')

    # Insert sample courses
    sample_courses = [
        ('Introduction to Data Science', 'Beginner', 'Dr. John Smith', 99.99, '8 weeks', None),
        ('Machine Learning Fundamentals', 'Intermediate', 'Prof. Sarah Johnson', 149.99, '12 weeks', None),
        ('Advanced Analytics', 'Advanced', 'Dr. Michael Chen', 199.99, '16 weeks', None)
    ]

    cursor.executemany('''
        INSERT INTO courses (title, level, instructor, price, duration, pdf_path)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', sample_courses)

    # Insert sample course details
    course_details = [
        (1, 'Learn the basics of data science and analytics', 'Understand data analysis fundamentals', 'Basic Python knowledge', 'Week 1-8: Data Analysis Basics'),
        (2, 'Master machine learning algorithms', 'Build and deploy ML models', 'Python, Statistics', 'Week 1-12: ML Algorithms'),
        (3, 'Advanced data analysis techniques', 'Implement complex analytics solutions', 'ML Fundamentals', 'Week 1-16: Advanced Analytics')
    ]

    cursor.executemany('''
        INSERT INTO course_details (course_id, description, learning_objectives, prerequisites, syllabus)
        VALUES (?, ?, ?, ?, ?)
    ''', course_details)

    # Insert sample blog posts
    blog_posts = [
        ('Getting Started with Data Science', 'Dr. John Smith', 'Learn the basics of data science...', 'active'),
        ('Machine Learning Trends 2024', 'Prof. Sarah Johnson', 'Explore the latest trends in ML...', 'active'),
        ('Data Analytics Best Practices', 'Dr. Michael Chen', 'Best practices for data analysis...', 'active')
    ]

    cursor.executemany('''
        INSERT INTO blog_posts (title, author, content, status)
        VALUES (?, ?, ?, ?)
    ''', blog_posts)

    # Insert sample services
    services = [
        ('Data Analysis Consulting', 'Professional data analysis services', 499.99, 'active'),
        ('Machine Learning Solutions', 'Custom ML model development', 999.99, 'active'),
        ('Data Science Training', 'Corporate training programs', 1499.99, 'active')
    ]

    cursor.executemany('''
        INSERT INTO services (name, description, price, status)
        VALUES (?, ?, ?, ?)
    ''', services)

    conn.commit()
    conn.close()

    print("Database reset completed successfully!")
    print("\nDefault users created:")
    print("Admin - Email: admin@example.com, Password: admin123")
    print("Student - Email: student@example.com, Password: student123")

if __name__ == "__main__":
    reset_database() 