/**
 * lib/supabase.ts
 * Supabase client — used for AUTH ONLY on the frontend.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("Missing Supabase env vars. Auth will not work until they are set in .env.local");
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, name: string) {
  return supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name,
      }
    }
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

/**
 * Get the currently authenticated user (null if not logged in).
 * This checks the local session.
 */
export async function getUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return null;
  return session.user;
}

export function onAuthStateChange(
  callback: (user: import("@supabase/supabase-js").User | null) => void,
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    
    // Sync a basic cookie for the Next.js middleware to read
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      document.cookie = 'sb-auth=true; path=/; max-age=31536000; SameSite=Lax';
    } else if (event === 'SIGNED_OUT') {
      document.cookie = 'sb-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    callback(session?.user ?? null);
  });

  return subscription;
}
