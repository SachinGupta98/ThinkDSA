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
    # Point Flask's static folder to the Next.js export directory
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'out'))
    app = Flask(__name__, static_folder=frontend_dir, static_url_path='/')

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
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        # Check if the .html extension of the file exists (Next.js routing)
        elif path != "" and os.path.exists(os.path.join(app.static_folder, path + '.html')):
            return send_from_directory(app.static_folder, path + '.html')
        # Check if it's a dynamic route like patterns/two-pointers
        elif path != "" and os.path.exists(os.path.join(app.static_folder, path, 'index.html')):
            return send_from_directory(app.static_folder, os.path.join(path, 'index.html'))
        # Otherwise fallback to index.html
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
