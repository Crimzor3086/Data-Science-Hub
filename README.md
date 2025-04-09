# Data Science Hub

A comprehensive platform for data science education, resources, and community collaboration.

## Features

- **User Authentication**
  - Secure signup and login with form validation
  - Social login (Google & GitHub)
  - Password reset functionality
  - Rate limiting for security
  - Accessible form elements with ARIA labels

- **Admin Dashboard**
  - User management (view, edit, delete)
  - Course management
  - Blog post management
  - Service management
  - Search and filter functionality
  - Pagination support
  - Responsive design
  - Accessible interface

- **Content Management**
  - Blog posts about data science
  - Course listings with filtering
  - Team member profiles with expertise
  - Service offerings
  - Contact form with validation

- **Security Features**
  - Rate limiting for authentication attempts
  - Secure password hashing
  - Session management
  - OAuth2 integration
  - Form validation and sanitization
  - Admin authentication and authorization

- **Accessibility Features**
  - ARIA labels and roles
  - Semantic HTML structure
  - Proper heading hierarchy
  - Alt text for images
  - Keyboard navigation support
  - Screen reader compatibility
  - High contrast color scheme

## Tech Stack

- **Frontend**
  - HTML5 with semantic markup
  - CSS3 with responsive design
  - JavaScript with form validation
  - SVG for icons and graphics
  - Google Fonts integration
  - Modern CSS features (Flexbox, Grid)
  - CSS custom properties

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
│   │   ├── style.css
│   │   └── admin.css
│   ├── images/
│   │   ├── about/
│   │   ├── icons/
│   │   ├── placeholders/
│   │   └── logo.svg
│   └── js/
│       ├── admin.js
│       └── main.js
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
│   ├── admin.html
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
├── database_handler.py
├── index.html
├── requirements.txt
└── README.md
```

## Key Improvements

- **Admin Dashboard**
  - Modern and responsive design
  - Tab-based navigation
  - Search and filter functionality
  - Pagination support
  - Accessible interface
  - Secure authentication

- **Accessibility**
  - Added ARIA labels and roles
  - Improved semantic HTML structure
  - Enhanced keyboard navigation
  - Added proper form validation feedback
  - Improved error message handling
  - Screen reader compatibility

- **User Experience**
  - Enhanced form validation
  - Improved error messages
  - Added loading states
  - Better navigation structure
  - Consistent styling across pages
  - Responsive design for all devices

- **Security**
  - Enhanced form validation
  - Improved password requirements
  - Better error handling
  - Secure social login integration
  - Protected routes and endpoints
  - Admin authentication and authorization

- **SEO**
  - Added meta descriptions
  - Improved semantic structure
  - Enhanced heading hierarchy
  - Added proper alt text
  - Optimized content structure

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