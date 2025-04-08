import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OAuth Configuration
class OAuthConfig:
    # Google OAuth Configuration
    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
    GOOGLE_AUTH_URI = 'https://accounts.google.com/o/oauth2/auth'
    GOOGLE_TOKEN_URI = 'https://oauth2.googleapis.com/token'
    GOOGLE_USER_INFO = 'https://www.googleapis.com/oauth2/v1/userinfo'
    GOOGLE_REDIRECT_URI = 'http://0.0.0.0:8000/auth/google/callback'
    GOOGLE_SCOPE = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]

    # GitHub OAuth Configuration
    GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')
    GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')
    GITHUB_AUTH_URI = 'https://github.com/login/oauth/authorize'
    GITHUB_TOKEN_URI = 'https://github.com/login/oauth/access_token'
    GITHUB_USER_INFO = 'https://api.github.com/user'
    GITHUB_REDIRECT_URI = 'http://0.0.0.0:8000/auth/github/callback'
    GITHUB_SCOPE = ['user:email']

    @classmethod
    def validate_config(cls):
        """Validate that all required OAuth configuration is present"""
        required_vars = [
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'GITHUB_CLIENT_ID',
            'GITHUB_CLIENT_SECRET'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required OAuth configuration: {', '.join(missing_vars)}") 