# Data Science Hub

A comprehensive platform for data science education, resources, and community collaboration.

## Features

- **User Authentication**
  - Secure signup and login
  - Email verification
  - Social login (Google & GitHub)
  - Password reset functionality
  - Rate limiting for security

- **Content Management**
  - Blog posts about data science
  - Course listings
  - Team member profiles
  - Service offerings
  - Contact form

- **Security Features**
  - Rate limiting for authentication attempts
  - Secure password hashing
  - Session management
  - Email verification
  - OAuth2 integration

## Tech Stack

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript
  - SVG for icons and graphics

- **Backend**
  - Python
  - Flask
  - SQLite
  - SMTP for email services

- **Authentication**
  - OAuth2 (Google & GitHub)
  - JWT for session management
  - SHA-256 for password hashing

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Crimzor3086/Data-Science-Hub.git
   cd Data-Science-Hub
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   BASE_URL=http://localhost:5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Initialize the database**
   ```bash
   python -c "from database.db import Database; db = Database()"
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

## Project Structure

```
Data-Science-Hub/
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── auth/
│   ├── oauth_handler.py
│   └── email_service.py
├── config/
│   └── oauth_config.py
├── database/
│   ├── db.py
│   └── schema.sql
├── pages/
│   ├── about.html
│   ├── blog.html
│   ├── contact.html
│   ├── courses.html
│   ├── login.html
│   ├── services.html
│   ├── signup.html
│   └── team.html
├── templates/
│   ├── verification_success.html
│   └── verification_error.html
├── app.py
├── requirements.txt
└── README.md
```

## Security Measures

- Rate limiting for authentication attempts
- Secure password hashing with salt
- Email verification system
- Session management with JWT
- OAuth2 integration for social login
- Input validation and sanitization
- Error handling and logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- GitHub: [Crimzor3086](https://github.com/Crimzor3086)
- Email: dbliss852@gmail.com