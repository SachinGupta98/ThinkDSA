"""
ThinkDSA Backend — Flask Application Entry Point
"""

from flask import Flask, jsonify
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
    app = Flask(__name__)

    # ─── CORS — allow frontend dev server ───
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:3000"]}},
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

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
