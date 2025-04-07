import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime, timedelta
import secrets
from config.oauth_config import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.sender_email = os.getenv('SMTP_USERNAME')
        self.sender_password = os.getenv('SMTP_PASSWORD')
        self.base_url = os.getenv('BASE_URL', 'http://localhost:5000')

    def send_verification_email(self, recipient_email, verification_token):
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = recipient_email
            msg['Subject'] = 'Verify your email - Data Science Hub'

            # Create email body
            verification_link = f"{self.base_url}/verify-email?token={verification_token}"
            body = f"""
            <html>
                <body>
                    <h2>Welcome to Data Science Hub!</h2>
                    <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
                    <p><a href="{verification_link}">Verify Email Address</a></p>
                    <p>This link will expire in 24 hours.</p>
                    <p>If you did not create an account, please ignore this email.</p>
                    <br>
                    <p>Best regards,<br>Data Science Hub Team</p>
                </body>
            </html>
            """

            msg.attach(MIMEText(body, 'html'))

            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)

            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    def send_password_reset_email(self, recipient_email, reset_token):
        try:
            msg = MIMEMultipart()
            msg['From'] = self.sender_email
            msg['To'] = recipient_email
            msg['Subject'] = 'Password Reset Request - Data Science Hub'

            reset_link = f"{self.base_url}/reset-password?token={reset_token}"
            body = f"""
            <html>
                <body>
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset your password. Click the link below to proceed:</p>
                    <p><a href="{reset_link}">Reset Password</a></p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <br>
                    <p>Best regards,<br>Data Science Hub Team</p>
                </body>
            </html>
            """

            msg.attach(MIMEText(body, 'html'))

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(msg)

            return True
        except Exception as e:
            print(f"Error sending password reset email: {str(e)}")
            return False 