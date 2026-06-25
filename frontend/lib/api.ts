/**
 * lib/api.ts
 * All Flask backend API calls live here.
 * Import this wherever you need data from the backend — never call fetch() directly in components.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// ─── Shared fetch helper ──────────────────────────────────────────────────────
async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      (errorBody as { error?: string }).error ??
        `API error: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnalysisResult {
  problem_title?: string;
  platform?: string;
  difficulty?: string;
  problem_summary: string;
  constraint_intelligence: Array<{ constraint: string; meaning: string }>;
  pattern_detected: string;
  recognition_signals: string[];
  why_this_pattern: string;
  why_not_others: Array<{ pattern: string; reason: string }>;
  algorithm_decision_tree: Array<{ question: string; answer: string }>;
  math_behind: string;
  code_analysis: {
    applicable: boolean;
    logic_errors: string[];
    edge_cases_missed: string[];
    complexity: { current: string; optimal: string };
    what_is_wrong: string;
    what_is_right: string;
  };
  thinking_framework: string;
  alternative_approaches: Array<{ approach: string; tradeoff: string }>;
  vault_entry: {
    pattern: string;
    recognition_signal: string;
    common_trap: string;
    future_trigger: string;
  };
}

export interface VaultEntry {
  id: string;
  problem_title: string;
  pattern: string;
  recognition_signal: string;
  common_trap: string;
  future_trigger: string;
  thinking_framework: string;
  alternative_approaches: Array<{ approach: string; tradeoff: string }>;
  created_at: string;
}

export interface UserProfile {
  email: string;
  joined: string;
  total_analyzed: number;
  patterns_encountered: number;
  streak: number;
  vault_count: number;
  recent_activity: Array<{
    id: string;
    title: string;
    pattern: string;
    time_ago: string;
  }>;
  heatmap_data: Record<string, number>;
  pattern_brain: Record<string, { count: number; accuracy: number }>;
}

export interface Pattern {
  id: string;
  name: string;
  color: string;
  recognition_signal: string;
  problem_count: number;
  examples: string[];
}

// ─── API object ───────────────────────────────────────────────────────────────

export const api = {
  /** Health check — use to verify backend is reachable */
  health: () =>
    request<{ status: string; service: string }>("/api/health"),

  // ── Analyze ──────────────────────────────────────────────────────────────

  /**
   * POST /api/analyze/problem
   * Sends a DSA problem to Claude for pattern recognition analysis.
   */
  analyze: (data: {
    problem_text: string;
    user_code?: string;
    language: string;
    user_id?: string;
  }) =>
    request<{ success: boolean; data: AnalysisResult }>("/api/analyze/problem", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /**
   * POST /api/analyze/save-vault
   * Saves an analysis result to the user's Knowledge Vault.
   */
  saveVault: (data: {
    user_id: string;
    problem_text: string;
    analysis: AnalysisResult;
    title: string;
  }) =>
    request<{ success: boolean; message: string }>("/api/analyze/save-vault", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /**
   * POST /api/analyze/extract-text
   * Extracts text from a base64 encoded image using Google Gemini
   */
  extractTextFromImage: (base64Image: string) =>
    request<{ success: boolean; text: string; error?: string }>("/api/analyze/extract-text", {
      method: "POST",
      body: JSON.stringify({ image_data: base64Image }),
    }),

  /**
   * POST /api/buddy/chat
   * Chat with the DSA Buddy
   */
  buddyChat: (messages: any[], userId?: string) =>
    request<{ success: boolean; response: string; error?: string }>("/api/buddy/chat", {
      method: "POST",
      body: JSON.stringify({ messages, user_id: userId }),
    }),

  /**
   * GET /api/buddy/history/:userId
   * Fetch Buddy Chat History
   */
  getBuddyHistory: (userId: string) =>
    request<{ success: boolean; data: any[] }>(`/api/buddy/history/${userId}`),

  /**
   * DELETE /api/buddy/history/:userId
   * Clear Buddy Chat History
   */
  clearBuddyHistory: (userId: string) =>
    request<{ success: boolean; message: string }>(`/api/buddy/history/${userId}`, {
      method: "DELETE",
    }),

  // ── Vault ─────────────────────────────────────────────────────────────────

  /**
   * GET /api/vault/:userId
   * Fetches all vault entries for a user.
   */
  getVault: (userId: string) =>
    request<{ success: boolean; data: VaultEntry[] }>(`/api/vault/${userId}`),

  /**
   * DELETE /api/vault/:entryId
   * Deletes a single vault entry.
   */
  deleteVault: (entryId: string) =>
    request<{ success: boolean; message: string }>(`/api/vault/${entryId}`, {
      method: "DELETE",
    }),

  // ── Patterns ──────────────────────────────────────────────────────────────

  /**
   * GET /api/patterns/
   * Returns all 8 core DSA patterns.
   */
  getPatterns: () =>
    request<{ success: boolean; data: Pattern[] }>("/api/patterns/"),

  /**
   * GET /api/patterns/:patternId
   * Returns a single pattern by ID.
   */
  getPattern: (patternId: string) =>
    request<{ success: boolean; data: Pattern }>(`/api/patterns/${patternId}`),

  // ── Profile ───────────────────────────────────────────────────────────────

  /**
   * GET /api/profile/:userId
   * Fetches user profile and pattern brain stats.
   */
  getProfile: (userId: string) =>
    request<{ success: boolean; data: UserProfile }>(`/api/profile/${userId}`),

  /**
   * PATCH /api/profile/:userId
   * Updates user profile fields.
   */
  updateProfile: (userId: string, fields: Partial<UserProfile>) =>
    request<{ success: boolean; message: string }>(`/api/profile/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
    }),
};
