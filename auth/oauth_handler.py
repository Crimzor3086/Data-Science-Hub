import requests
from flask import redirect, session, url_for, current_app
from config.oauth_config import OAuthConfig
from database.db import Database

class OAuthHandler:
    def __init__(self):
        self.db = Database()
        OAuthConfig.validate_config()

    def get_google_auth_url(self):
        """Generate Google OAuth URL"""
        params = {
            'client_id': OAuthConfig.GOOGLE_CLIENT_ID,
            'redirect_uri': OAuthConfig.GOOGLE_REDIRECT_URI,
            'response_type': 'code',
            'scope': ' '.join(OAuthConfig.GOOGLE_SCOPE),
            'access_type': 'offline',
            'prompt': 'consent'
        }
        auth_url = f"{OAuthConfig.GOOGLE_AUTH_URI}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"
        return auth_url

    def get_github_auth_url(self):
        """Generate GitHub OAuth URL"""
        params = {
            'client_id': OAuthConfig.GITHUB_CLIENT_ID,
            'redirect_uri': OAuthConfig.GITHUB_REDIRECT_URI,
            'scope': ' '.join(OAuthConfig.GITHUB_SCOPE)
        }
        auth_url = f"{OAuthConfig.GITHUB_AUTH_URI}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"
        return auth_url

    def handle_google_callback(self, code):
        """Handle Google OAuth callback"""
        try:
            # Exchange code for access token
            token_data = {
                'code': code,
                'client_id': OAuthConfig.GOOGLE_CLIENT_ID,
                'client_secret': OAuthConfig.GOOGLE_CLIENT_SECRET,
                'redirect_uri': OAuthConfig.GOOGLE_REDIRECT_URI,
                'grant_type': 'authorization_code'
            }
            token_response = requests.post(OAuthConfig.GOOGLE_TOKEN_URI, data=token_data)
            token_response.raise_for_status()
            access_token = token_response.json()['access_token']

            # Get user info
            headers = {'Authorization': f'Bearer {access_token}'}
            user_response = requests.get(OAuthConfig.GOOGLE_USER_INFO, headers=headers)
            user_response.raise_for_status()
            user_info = user_response.json()

            # Create or update user in database
            user = self.db.create_or_update_user(
                email=user_info['email'],
                name=user_info.get('name', ''),
                provider='google',
                provider_id=user_info['id']
            )

            # Set session
            session['user_id'] = user['id']
            session['email'] = user['email']
            session['name'] = user['name']
            session['provider'] = 'google'

            return redirect(url_for('dashboard'))

        except requests.exceptions.RequestException as e:
            current_app.logger.error(f"Google OAuth error: {str(e)}")
            return redirect(url_for('login', error='Authentication failed'))

    def handle_github_callback(self, code):
        """Handle GitHub OAuth callback"""
        try:
            # Exchange code for access token
            token_data = {
                'client_id': OAuthConfig.GITHUB_CLIENT_ID,
                'client_secret': OAuthConfig.GITHUB_CLIENT_SECRET,
                'code': code,
                'redirect_uri': OAuthConfig.GITHUB_REDIRECT_URI
            }
            headers = {'Accept': 'application/json'}
            token_response = requests.post(
                OAuthConfig.GITHUB_TOKEN_URI,
                data=token_data,
                headers=headers
            )
            token_response.raise_for_status()
            access_token = token_response.json()['access_token']

            # Get user info
            headers = {'Authorization': f'token {access_token}'}
            user_response = requests.get(OAuthConfig.GITHUB_USER_INFO, headers=headers)
            user_response.raise_for_status()
            user_info = user_response.json()

            # Get user email
            email_response = requests.get('https://api.github.com/user/emails', headers=headers)
            email_response.raise_for_status()
            emails = email_response.json()
            primary_email = next((email['email'] for email in emails if email['primary']), None)

            if not primary_email:
                raise ValueError("No primary email found for GitHub user")

            # Create or update user in database
            user = self.db.create_or_update_user(
                email=primary_email,
                name=user_info.get('name', user_info['login']),
                provider='github',
                provider_id=str(user_info['id'])
            )

            # Set session
            session['user_id'] = user['id']
            session['email'] = user['email']
            session['name'] = user['name']
            session['provider'] = 'github'

            return redirect(url_for('dashboard'))

        except (requests.exceptions.RequestException, ValueError) as e:
            current_app.logger.error(f"GitHub OAuth error: {str(e)}")
            return redirect(url_for('login', error='Authentication failed')) 