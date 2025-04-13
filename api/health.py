from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        self._set_headers(200)
        self.wfile.write(json.dumps({
            "status": "healthy",
            "timestamp": "2023-04-13T12:00:00Z"
        }).encode()) 