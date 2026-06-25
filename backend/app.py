"""
ThinkDSA Backend — Flask Application Entry Point
"""

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

# ─── Load environment variables ───
load_dotenv()

# ─── Import blueprints ───
from routes.analyze import analyze_bp
from routes.vault import vault_bp
from routes.patterns import patterns_bp
from routes.profile import profile_bp
from routes.buddy import buddy_bp


def create_app() -> Flask:
    """Application factory."""
    # Disable Flask's default static file serving to prevent 404 conflicts with our catch-all route
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'out'))
    app = Flask(__name__, static_folder=None)

    # ─── CORS — allow all for unified deployment ───
    CORS(
        app,
        resources={r"/api/*": {"origins": "*"}},
        supports_credentials=True,
    )

    # ─── Register blueprints ───
    app.register_blueprint(analyze_bp,   url_prefix="/api/analyze")
    app.register_blueprint(vault_bp,     url_prefix="/api/vault")
    app.register_blueprint(patterns_bp,  url_prefix="/api/patterns")
    app.register_blueprint(profile_bp,   url_prefix="/api/profile")
    app.register_blueprint(buddy_bp,     url_prefix="/api/buddy")

    # ─── Health check ───
    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "ThinkDSA API"}), 200

    # ─── Catch-all for Next.js SPA ───
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        # Prevent routing API calls to the frontend
        if path.startswith("api/"):
            return jsonify({"error": "Not Found"}), 404
            
        # Check if the exact file exists (e.g., globals.css, images, etc.)
        if path != "" and os.path.exists(os.path.join(frontend_dir, path)):
            return send_from_directory(frontend_dir, path)
        # Check if the .html extension of the file exists (Next.js routing)
        elif path != "" and os.path.exists(os.path.join(frontend_dir, path + '.html')):
            return send_from_directory(frontend_dir, path + '.html')
        # Check if it's a dynamic route like patterns/two-pointers
        elif path != "" and os.path.exists(os.path.join(frontend_dir, path, 'index.html')):
            return send_from_directory(frontend_dir, os.path.join(path, 'index.html'))
        # Otherwise fallback to index.html
        else:
            return send_from_directory(frontend_dir, 'index.html')

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
