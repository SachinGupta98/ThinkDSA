"""routes/patterns.py — Pattern library endpoints."""

from flask import Blueprint, jsonify

patterns_bp = Blueprint("patterns", __name__)

# ─── Static pattern data (will later be stored in Supabase) ───
PATTERNS = [
    {
        "id": "arrays-hashing",
        "name": "Arrays + Hashing",
        "color": "blue",
        "recognition_signal": "When you need O(1) lookups, frequency counts, or complement checks.",
        "problem_count": 42,
        "examples": ["Two Sum", "Group Anagrams", "Top K Frequent Elements"],
    },
    {
        "id": "two-pointers",
        "name": "Two Pointers",
        "color": "purple",
        "recognition_signal": "When the array is sorted and you need to find pairs or eliminate search space.",
        "problem_count": 31,
        "examples": ["Valid Palindrome", "3Sum", "Container With Most Water"],
    },
    {
        "id": "sliding-window",
        "name": "Sliding Window",
        "color": "teal",
        "recognition_signal": "When you need max/min of a contiguous subarray of fixed or variable size.",
        "problem_count": 28,
        "examples": ["Best Time to Buy Stock", "Longest Substring Without Repeating Characters"],
    },
    {
        "id": "binary-search",
        "name": "Binary Search",
        "color": "amber",
        "recognition_signal": "When the search space is sorted or monotonic and you need O(log N).",
        "problem_count": 24,
        "examples": ["Binary Search", "Search in Rotated Sorted Array", "Find Minimum in Rotated Array"],
    },
    {
        "id": "trees",
        "name": "Trees",
        "color": "emerald",
        "recognition_signal": "When data is hierarchical — use DFS or BFS depending on level vs path.",
        "problem_count": 38,
        "examples": ["Invert Binary Tree", "Maximum Depth of Binary Tree", "Lowest Common Ancestor"],
    },
    {
        "id": "graphs",
        "name": "Graphs",
        "color": "rose",
        "recognition_signal": "When nodes have arbitrary connections — islands, paths, components.",
        "problem_count": 29,
        "examples": ["Number of Islands", "Clone Graph", "Course Schedule"],
    },
    {
        "id": "dynamic-programming",
        "name": "Dynamic Programming",
        "color": "orange",
        "recognition_signal": "When a problem has overlapping subproblems and optimal substructure.",
        "problem_count": 45,
        "examples": ["Climbing Stairs", "Longest Common Subsequence", "0-1 Knapsack"],
    },
    {
        "id": "backtracking",
        "name": "Backtracking",
        "color": "pink",
        "recognition_signal": "When you need to explore all possibilities and prune invalid paths.",
        "problem_count": 21,
        "examples": ["Subsets", "Permutations", "N-Queens"],
    },
]


@patterns_bp.get("/")
def get_all_patterns():
    """
    GET /api/patterns/
    Returns all 8 core DSA patterns.
    """
    return jsonify({"success": True, "data": PATTERNS}), 200


@patterns_bp.get("/<pattern_id>")
def get_pattern(pattern_id: str):
    """
    GET /api/patterns/<pattern_id>
    Returns a single pattern by ID.
    """
    pattern = next((p for p in PATTERNS if p["id"] == pattern_id), None)
    if not pattern:
        return jsonify({"error": f"Pattern '{pattern_id}' not found"}), 404
    return jsonify({"success": True, "data": pattern}), 200
