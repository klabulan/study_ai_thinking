#!/usr/bin/env python3
"""
Simple HTTP server for local development of the presentation.
Fixes CORS issues when loading content from file system.

Usage:
    python dev-server.py

Then open: http://localhost:8000
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    # Change to the script's directory
    os.chdir(Path(__file__).parent)

    PORT = 8000

    print(f"🚀 Starting presentation development server...")
    print(f"📁 Serving from: {os.getcwd()}")
    print(f"🌐 Open in browser: http://localhost:{PORT}")
    print(f"🛑 Press Ctrl+C to stop")
    print()

    try:
        with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped.")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use.")
            print(f"   Try a different port or stop the running server.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()