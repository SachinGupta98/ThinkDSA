import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class SupabaseService:
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        if not url or not key:
            print("WARNING: SUPABASE_URL and SUPABASE_KEY must be set in backend/.env")
            self.client = None
        else:
            self.client: Client = create_client(url, key)

    def save_analyzed_problem(self, user_id: str, problem_title: str, pattern: str) -> dict:
        if not self.client:
            return {}
        data = {
            "user_id": user_id,
            "title": problem_title,
            "pattern": pattern
        }
        try:
            resp = self.client.table("analyzed_problems").insert(data).execute()
            return resp.data[0] if resp.data else {}
        except Exception as e:
            print(f"Error saving analyzed problem: {e}")
            return {}

    def save_vault_entry(self, user_id: str, vault_data: dict) -> dict:
        if not self.client:
            return {}
        data = {
            "user_id": user_id,
            "title": vault_data.get("title", "Untitled Problem"),
            "problem_text": vault_data.get("problem_text", ""),
            "analysis": vault_data.get("analysis", {})
        }
        try:
            resp = self.client.table("vault_entries").insert(data).execute()
            return resp.data[0] if resp.data else {}
        except Exception as e:
            print(f"Error saving vault entry: {e}")
            return {}

    def get_vault_entries(self, user_id: str) -> list:
        if not self.client:
            return []
        try:
            resp = self.client.table("vault_entries").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
            return resp.data
        except Exception as e:
            print(f"Error fetching vault entries: {e}")
            return []

    def delete_vault_entry(self, entry_id: str) -> bool:
        if not self.client:
            return False
        try:
            self.client.table("vault_entries").delete().eq("id", entry_id).execute()
            return True
        except Exception as e:
            print(f"Error deleting vault entry: {e}")
            return False

    def get_buddy_chat(self, user_id: str) -> list:
        if not self.client:
            return []
        try:
            resp = self.client.table("buddy_chats").select("messages").eq("user_id", user_id).execute()
            if resp.data and len(resp.data) > 0:
                return resp.data[0].get("messages", [])
            return []
        except Exception as e:
            print(f"Error fetching buddy chat: {e}")
            return []

    def save_buddy_chat(self, user_id: str, messages: list) -> bool:
        if not self.client:
            return False
        import datetime
        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        try:
            # Upsert relying on unique user_id constraint
            data = {
                "user_id": user_id,
                "messages": messages,
                "updated_at": now
            }
            # We must use upsert since user_id is unique
            self.client.table("buddy_chats").upsert(data, on_conflict="user_id").execute()
            return True
        except Exception as e:
            print(f"Error saving buddy chat: {e}")
            return False

    def clear_buddy_chat(self, user_id: str) -> bool:
        if not self.client:
            return False
        try:
            self.client.table("buddy_chats").delete().eq("user_id", user_id).execute()
            return True
        except Exception as e:
            print(f"Error clearing buddy chat: {e}")
            return False

    def get_user_stats(self, user_id: str) -> dict:
        import datetime
        stats = {
            "total_analyzed": 0,
            "patterns_encountered": 0,
            "streak": 0,
            "vault_count": 0,
            "recent_activity": [],
            "heatmap_data": {},
            "email": "user@thinkdsa.com",
            "joined": "2024-01-01T00:00:00Z"
        }
        if not self.client:
            return stats

        try:
            # Try to get user email and joined from auth using admin api if possible
            # We will catch error if it's an anon key and not allowed
            try:
                user_resp = self.client.auth.admin.get_user_by_id(user_id)
                stats["email"] = user_resp.user.email
                stats["joined"] = user_resp.user.created_at
            except Exception:
                pass # Ignore if we don't have admin privileges

            # Analyzed problems
            analyzed_resp = self.client.table("analyzed_problems").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
            
            # Heatmap data and streak calculation
            today = datetime.datetime.now(datetime.timezone.utc).date()
            heatmap = {}
            active_dates = set()
            
            if analyzed_resp.data:
                problems = analyzed_resp.data
                stats["total_analyzed"] = len(problems)
                
                # Unique patterns
                patterns = {p.get("pattern") for p in problems if p.get("pattern")}
                stats["patterns_encountered"] = len(patterns)
                
                # Recent activity
                for p in problems[:5]:
                    stats["recent_activity"].append({
                        "id": p.get("id"),
                        "title": p.get("title", "Unknown"),
                        "pattern": p.get("pattern", "Unknown"),
                        "time_ago": "recently"
                    })
                
                # Process dates for heatmap and streak
                for p in problems:
                    created_at_str = p.get("created_at")
                    if created_at_str:
                        # simple parsing up to 'T'
                        date_str = created_at_str.split("T")[0]
                        heatmap[date_str] = heatmap.get(date_str, 0) + 1
                        
                        try:
                            dt = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
                            active_dates.add(dt)
                        except Exception:
                            pass
                            
                # Calculate streak
                streak = 0
                current_date = today
                # If they didn't do anything today, check if they did yesterday to keep streak
                if current_date not in active_dates:
                    current_date = current_date - datetime.timedelta(days=1)
                    
                while current_date in active_dates:
                    streak += 1
                    current_date = current_date - datetime.timedelta(days=1)
                
                stats["streak"] = streak
                stats["heatmap_data"] = heatmap

            # Vault count
            vault_resp = self.client.table("vault_entries").select("id", count="exact").eq("user_id", user_id).execute()
            if vault_resp.count is not None:
                stats["vault_count"] = vault_resp.count

        except Exception as e:
            print(f"Error getting user stats: {e}")

        return stats

    def get_pattern_brain(self, user_id: str) -> dict:
        # Default shape
        brain = {
            "Arrays": { "count": 0, "accuracy": 0 },
            "Hashing": { "count": 0, "accuracy": 0 },
            "Sliding Window": { "count": 0, "accuracy": 0 },
            "Two Pointers": { "count": 0, "accuracy": 0 },
            "Binary Search": { "count": 0, "accuracy": 0 },
            "Trees": { "count": 0, "accuracy": 0 },
            "Graphs": { "count": 0, "accuracy": 0 },
            "DP": { "count": 0, "accuracy": 0 },
            "Backtracking": { "count": 0, "accuracy": 0 }
        }
        if not self.client:
            return brain

        try:
            resp = self.client.table("analyzed_problems").select("pattern").eq("user_id", user_id).execute()
            if resp.data:
                for row in resp.data:
                    pat = row.get("pattern")
                    # Also fallback mapped patterns
                    if pat == "Arrays + Hashing":
                        pat = "Hashing"
                    
                    if pat and pat in brain:
                        brain[pat]["count"] += 1
                        # Default accuracy calculation since we don't track user correctness yet
                        brain[pat]["accuracy"] = min(100, brain[pat]["count"] * 20)
        except Exception as e:
            print(f"Error getting pattern brain: {e}")

        return brain
