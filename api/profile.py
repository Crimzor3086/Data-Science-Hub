from http.server import BaseHTTPRequestHandler
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import db, User, UserProfile, Course, Achievement

class ProfileHandler(BaseHTTPRequestHandler):
    def _send_json_response(self, data: Dict[str, Any], status_code: int = 200) -> None:
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _get_request_body(self) -> Dict[str, Any]:
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        return json.loads(body.decode())

    def do_GET(self):
        """Get user profile"""
        try:
            # Get user ID from query parameters
            user_id = self.path.split('?')[1].split('=')[1] if '?' in self.path else None
            
            if not user_id:
                self._send_json_response({"error": "User ID is required"}, 400)
                return

            # Get user profile from database
            user = User.query.get(user_id)
            if not user:
                self._send_json_response({"error": "User not found"}, 404)
                return

            profile = UserProfile.query.filter_by(user_id=user_id).first()
            if not profile:
                self._send_json_response({"error": "Profile not found"}, 404)
                return

            # Get user's courses and achievements
            courses = Course.query.filter_by(user_id=user_id).all()
            achievements = Achievement.query.filter_by(user_id=user_id).all()

            response_data = {
                "name": user.name,
                "email": user.email,
                "bio": profile.bio,
                "avatar": profile.avatar_url,
                "role": user.role,
                "joinDate": user.created_at.strftime("%B %Y"),
                "skills": profile.skills.split(",") if profile.skills else [],
                "courses": [
                    {
                        "id": course.id,
                        "title": course.title,
                        "progress": course.progress
                    } for course in courses
                ],
                "achievements": [
                    {
                        "id": achievement.id,
                        "title": achievement.title,
                        "description": achievement.description,
                        "date": achievement.earned_at.strftime("%Y-%m-%d")
                    } for achievement in achievements
                ]
            }

            self._send_json_response(response_data)

        except Exception as e:
            self._send_json_response({"error": str(e)}, 500)

    def do_PUT(self):
        """Update user profile"""
        try:
            # Get user ID from query parameters
            user_id = self.path.split('?')[1].split('=')[1] if '?' in self.path else None
            
            if not user_id:
                self._send_json_response({"error": "User ID is required"}, 400)
                return

            # Get request body
            data = self._get_request_body()

            # Get user and profile from database
            user = User.query.get(user_id)
            if not user:
                self._send_json_response({"error": "User not found"}, 404)
                return

            profile = UserProfile.query.filter_by(user_id=user_id).first()
            if not profile:
                profile = UserProfile(user_id=user_id)
                db.session.add(profile)

            # Update user data
            if "name" in data:
                user.name = data["name"]
            if "email" in data:
                user.email = data["email"]

            # Update profile data
            if "bio" in data:
                profile.bio = data["bio"]
            if "skills" in data:
                profile.skills = ",".join(data["skills"])
            if "avatar" in data:
                profile.avatar_url = data["avatar"]

            db.session.commit()

            self._send_json_response({"message": "Profile updated successfully"})

        except Exception as e:
            db.session.rollback()
            self._send_json_response({"error": str(e)}, 500)

    def do_POST(self):
        """Create user profile"""
        try:
            # Get request body
            data = self._get_request_body()

            # Validate required fields
            required_fields = ["user_id", "name", "email"]
            for field in required_fields:
                if field not in data:
                    self._send_json_response({"error": f"{field} is required"}, 400)
                    return

            # Check if user exists
            user = User.query.get(data["user_id"])
            if not user:
                self._send_json_response({"error": "User not found"}, 404)
                return

            # Create or update profile
            profile = UserProfile.query.filter_by(user_id=data["user_id"]).first()
            if not profile:
                profile = UserProfile(user_id=data["user_id"])

            # Update user data
            user.name = data["name"]
            user.email = data["email"]

            # Update profile data
            profile.bio = data.get("bio", "")
            profile.skills = ",".join(data.get("skills", []))
            profile.avatar_url = data.get("avatar", "")

            db.session.add(profile)
            db.session.commit()

            self._send_json_response({"message": "Profile created successfully"})

        except Exception as e:
            db.session.rollback()
            self._send_json_response({"error": str(e)}, 500)

handler = ProfileHandler 