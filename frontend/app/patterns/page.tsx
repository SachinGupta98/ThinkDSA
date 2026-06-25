"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { api, UserProfile } from "@/lib/api";
import { patterns } from "@/lib/patterns/data";
import Sidebar from "@/components/ui/Sidebar";
import PatternCard from "@/components/patterns/PatternCard";
import { Loader2, BookOpen } from "lucide-react";

export default function PatternsLibraryPage() {
  const { user, isLoading: authLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (authLoading) return;
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getProfile(user.id);
        if (res.success) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile stats for patterns:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [user, authLoading]);

  // Render a loading state if we're waiting on auth or data
  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6 md:p-10 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#7c3aed]" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#7c3aed]/10 rounded-lg border border-[#7c3aed]/20 text-[#7c3aed]">
                <BookOpen size={24} />
              </div>
              <h1 className="text-3xl font-bold font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Pattern Library
              </h1>
            </div>
            <p className="text-[#9ca3af] max-w-2xl text-sm leading-relaxed ml-1">
              Master the core algorithmic patterns. Understanding these frameworks will allow you to solve thousands of DSA problems without memorizing individual solutions.
            </p>
            <div className="mt-4 ml-1 bg-[#1e1e2e]/50 border border-[#2a2a3a] rounded-lg p-3 inline-flex items-center gap-3">
              <span className="text-xl">📚</span>
              <p className="text-[#d1d5db] text-sm">
                Looking for a massive list of problems to practice these patterns? <br />
                Check out the <a href="/sheet" className="text-[#a78bfa] font-bold hover:underline">450 DSA Sheet</a> tab for a complete structured roadmap!
              </p>
            </div>
          </header>

          {/* Grid of Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {patterns.map((pattern, index) => {
              // Extract stats if user is logged in
              let analyzedCount = 0;
              if (profile && profile.pattern_brain && profile.pattern_brain[pattern.name]) {
                analyzedCount = profile.pattern_brain[pattern.name].count;
              }

              return (
                <div 
                  key={pattern.slug} 
                  className="animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <PatternCard 
                    slug={pattern.slug}
                    name={pattern.name}
                    tagline={pattern.tagline}
                    color={pattern.color}
                    iconName={pattern.icon}
                    analyzedCount={analyzedCount}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
