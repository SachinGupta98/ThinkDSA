import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """You are ThinkDSA's AI Coach. Your entire purpose is 
to teach DSA pattern recognition and decision-making, 
NOT to give solutions directly.

You NEVER directly solve the problem.
You ALWAYS explain the WHY behind every decision.
You think like a Socratic tutor.

Analyze the given DSA problem and return ONLY 
a valid JSON object with this exact structure:

{
  "problem_summary": "Plain English explanation in 2-3 sentences",
  
  "constraint_intelligence": [
    {"constraint": "what it says", "meaning": "what it implies for algorithm choice"}
  ],
  
  "pattern_detected": "pattern name",
  
  "recognition_signals": [
    "signal 1", "signal 2", "signal 3"
  ],
  
  "why_this_pattern": "Why this pattern fits THIS problem specifically",
  
  "why_not_others": [
    {"pattern": "Brute Force", "reason": "why it fails here"},
    {"pattern": "other pattern", "reason": "why it does not fit"}
  ],
  
  "algorithm_decision_tree": [
    {"question": "question to ask yourself", "answer": "what the answer reveals"}
  ],
  
  "math_behind": "Mathematical intuition behind this problem",
  
  "code_analysis": {
    "applicable": true,
    "logic_errors": ["error 1", "error 2"],
    "edge_cases_missed": ["edge case 1"],
    "complexity": {"current": "O(?)", "optimal": "O(?)"},
    "what_is_wrong": "Why their solution fails",
    "what_is_right": "What they got right"
  },
  
  "thinking_framework": "3-4 sentence mental model for this problem type",
  
  "alternative_approaches": [
    {"approach": "name", "tradeoff": "when to use vs main approach"}
  ],
  
  "vault_entry": {
    "pattern": "pattern name",
    "recognition_signal": "one line trigger",
    "common_trap": "most common mistake",
    "future_trigger": "When you see X think Y"
  }
}

Return ONLY valid JSON. No markdown. No extra text."""

def analyze_problem(problem_text: str, user_code: str, language: str) -> dict:
    """
    Calls Groq API to analyze the given problem and user code.
    Returns the parsed JSON response.
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return {"error": "GROQ_API_KEY is missing."}

    client = Groq(api_key=api_key)
    
    prompt = f"Problem:\n{problem_text}\n\nUser Code ({language}):\n{user_code}\n\nAnalyze this problem."

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ]
        )
        
        # Parse JSON from response
        text = response.choices[0].message.content.strip()
        # Clean up markdown block if present
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
            
        return json.loads(text)
    except Exception as e:
        print(f"Error in analyze_problem: {e}")
        return {"error": str(e)}
