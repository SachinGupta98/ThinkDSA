from flask import Blueprint, request, jsonify
from services.ai_service import analyze_problem
from services.supabase_service import SupabaseService

analyze_bp = Blueprint("analyze", __name__)
sb_service = SupabaseService()

from services.link_parser import parse_problem_from_url
from services.vision_service import extract_text_from_image

@analyze_bp.post("/extract-text")
def extract_text():
    """
    POST /api/analyze/extract-text
    Accepts: {image_data: "base64_string..."}
    """
    body = request.get_json(silent=True) or {}
    image_data = body.get("image_data")
    
    if not image_data:
        return jsonify({"success": False, "error": "image_data is required"}), 400
        
    result = extract_text_from_image(image_data)
    
    if not result.get("success"):
        return jsonify({"success": False, "error": result.get("error", "Unknown error")}), 500
        
    return jsonify({"success": True, "text": result.get("text")}), 200

@analyze_bp.post("/problem")
def analyze():
    """
    POST /api/analyze/problem
    Accepts: {problem_text, user_code, language, user_id}
    Calls AI analysis and saves to DB.
    """
    body = request.get_json(silent=True) or {}
    user_input = body.get("problem_text", "")
    user_code = body.get("user_code", "")
    language = body.get("language", "python")
    user_id = body.get("user_id")

    if not user_input:
        return jsonify({"success": False, "error": "problem_text is required"}), 400

    # ── DETECT IF INPUT IS A URL ──
    is_url = user_input.strip().startswith('http')
    
    problem_text = user_input
    problem_title = "Untitled Problem"
    platform_info = None

    if is_url:
        parsed = parse_problem_from_url(user_input.strip())
        if not parsed['success']:
            return jsonify({
                "success": False,
                "error": parsed['error'],
                "suggestion": "Please paste the problem text directly instead."
            }), 400
        
        problem_text = parsed['problem_text']
        problem_title = parsed.get('title', '')
        platform_info = parsed
        
        if parsed.get('constraints'):
            problem_text += f"\n\nConstraints:\n{parsed['constraints']}"

    # Call AI Service
    analysis_result = analyze_problem(problem_text, user_code, language)

    if "error" in analysis_result:
        return jsonify({"success": False, "error": analysis_result["error"]}), 500

    # Add metadata to result
    if not is_url:
        problem_title = problem_text.split('\n')[0][:50].strip() if problem_text else "Untitled Problem"
        
    analysis_result['problem_title'] = problem_title
    analysis_result['platform'] = platform_info.get('platform', 'manual') if platform_info else 'manual'
    analysis_result['difficulty'] = platform_info.get('difficulty') if platform_info else None

    # Save to Supabase
    if user_id:
        pattern = analysis_result.get("pattern_detected", "Unknown")
        # Use fetched title or fallback to first 50 chars of problem text
        title_to_save = problem_title
        sb_service.save_analyzed_problem(user_id, title_to_save, pattern)

    return jsonify({"success": True, "data": analysis_result}), 200

@analyze_bp.post("/save-vault")
def save_vault():
    """
    POST /api/analyze/save-vault
    Accepts flat payload {user_id, title, problem_text, analysis}
    """
    body = request.get_json(silent=True) or {}
    user_id = body.get("user_id")
    
    vault_entry = body.get("vault_entry")
    if not vault_entry:
        vault_entry = {
            "title": body.get("title", "Untitled Problem"),
            "problem_text": body.get("problem_text", ""),
            "analysis": body.get("analysis", {})
        }

    if not user_id or not vault_entry.get("analysis"):
        return jsonify({"success": False, "error": "user_id and analysis are required"}), 400

    saved_data = sb_service.save_vault_entry(user_id, vault_entry)
    
    if not saved_data:
        return jsonify({"success": False, "error": "Failed to save vault entry"}), 500

    return jsonify({"success": True, "message": "Saved to vault successfully"}), 200
