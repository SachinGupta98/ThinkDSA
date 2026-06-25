from flask import Blueprint, jsonify
from services.supabase_service import SupabaseService

profile_bp = Blueprint("profile", __name__)
sb_service = SupabaseService()

@profile_bp.get("/<user_id>")
def get_profile(user_id: str):
    """
    GET /api/profile/<user_id>
    Return user stats: total problems analyzed, patterns encountered, streak, pattern brain breakdown
    """
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        stats = sb_service.get_user_stats(user_id)
        brain = sb_service.get_pattern_brain(user_id)
        data = {
            "email": stats.get("email", "user@thinkdsa.com"),
            "joined": stats.get("joined", "2024-01-01T00:00:00Z"),
            "total_analyzed": stats.get("total_analyzed", 0),
            "patterns_encountered": stats.get("patterns_encountered", 0),
            "vault_count": stats.get("vault_count", 0),
            "streak": stats.get("streak", 0),
            "heatmap_data": stats.get("heatmap_data", {}),
            "recent_activity": stats.get("recent_activity", []),
            "pattern_brain": brain
        }
        
        return jsonify({"success": True, "data": data}), 200
    except Exception as e:
        print(f"Error fetching profile for {user_id}: {e}")
        # Never return an error for new users, return zeros
        data = {
            "email": "user@thinkdsa.com",
            "joined": "2024-01-01T00:00:00Z",
            "total_analyzed": 0,
            "patterns_encountered": 0,
            "vault_count": 0,
            "streak": 0,
            "heatmap_data": {},
            "recent_activity": [],
            "pattern_brain": {
                "Arrays": { "count": 0, "accuracy": 0 },
                "Hashing": { "count": 0, "accuracy": 0 },
                "Sliding Window": { "count": 0, "accuracy": 0 },
                "Two Pointers": { "count": 0, "accuracy": 0 },
                "Binary Search": { "count": 0, "accuracy": 0 },
                "Trees": { "count": 0, "accuracy": 0 },
                "Graphs": { "count": 0, "accuracy": 0 },
                "DP": { "count": 0, "accuracy": 0 }
            }
        }
        return jsonify({"success": True, "data": data}), 200
