"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain } from "lucide-react";
import { signUp } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await signUp(email, password, name);
      
      if (signUpError) {
        throw new Error(signUpError.message);
      }

      if (data.user?.identities && data.user.identities.length === 0) {
        throw new Error("This email is already registered. Try logging in.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-4 font-sans text-[#f1f0f5]">
      <div className="w-full max-w-md bg-[#111118] border border-[#1e1e2e] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#7c3aed] opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#06b6d4] opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#7c3aed]/20 border border-[#7c3aed]/40">
              <Brain size={20} className="text-[#a78bfa]" />
            </div>
            <span className="font-bold text-2xl tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Think<span className="text-[#a78bfa]">DSA</span>
            </span>
          </Link>
          <p className="text-[#9ca3af] text-sm">Create your account to start training</p>
        </div>

        <form onSubmit={handleSignup} className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#d1d5db]" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-4 py-3 text-[#f1f0f5] placeholder-[#4b5563] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors"
              placeholder="Arjun S."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#d1d5db]" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-4 py-3 text-[#f1f0f5] placeholder-[#4b5563] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors"
              placeholder="you@university.edu"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#d1d5db]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-4 py-3 text-[#f1f0f5] placeholder-[#4b5563] focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-[#7c3aed]/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          {error && (
            <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        <div className="relative z-10 mt-6 text-center text-sm text-[#9ca3af]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#a78bfa] hover:text-[#c4b5fd] font-medium transition-colors">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
