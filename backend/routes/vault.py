from flask import Blueprint, jsonify
from services.supabase_service import SupabaseService

vault_bp = Blueprint("vault", __name__)
sb_service = SupabaseService()

@vault_bp.get("/<user_id>")
def get_vault(user_id: str):
    """
    GET /api/vault/<user_id>
    Fetch all vault entries for user from Supabase.
    """
    if not user_id:
        return jsonify({"success": False, "error": "user_id is required"}), 400

    entries = sb_service.get_vault_entries(user_id)
    
    # Map the raw DB structure to the flat structure expected by the frontend
    formatted_entries = []
    for e in entries:
        analysis = e.get("analysis", {})
        vault_entry = analysis.get("vault_entry", {})
        formatted_entries.append({
            "id": e.get("id"),
            "problem_title": e.get("title", "Untitled Problem"),
            "pattern": analysis.get("pattern_detected", "Unknown"),
            "recognition_signal": vault_entry.get("recognition_signal", ""),
            "common_trap": vault_entry.get("common_trap", ""),
            "future_trigger": vault_entry.get("future_trigger", ""),
            "thinking_framework": analysis.get("thinking_framework", ""),
            "alternative_approaches": analysis.get("alternative_approaches", []),
            "created_at": e.get("created_at")
        })

    return jsonify({"success": True, "data": formatted_entries}), 200


@vault_bp.delete("/<entry_id>")
def delete_vault(entry_id: str):
    """
    DELETE /api/vault/<entry_id>
    Delete a vault entry.
    """
    if not entry_id:
        return jsonify({"success": False, "error": "entry_id is required"}), 400

    success = sb_service.delete_vault_entry(entry_id)
    if success:
        return jsonify({"success": True, "message": "Entry deleted successfully"}), 200
    else:
        return jsonify({"success": False, "error": "Failed to delete entry"}), 500
