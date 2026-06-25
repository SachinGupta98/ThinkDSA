"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { api, UserProfile } from "@/lib/api";
import Sidebar from "@/components/ui/Sidebar";
import RecentActivity from "@/components/ui/RecentActivity";
import StatBadge from "@/components/profile/StatBadge";
import PatternBrainMap from "@/components/profile/PatternBrainMap";
import InsightCards from "@/components/profile/InsightCards";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import { Loader2, Flame, Puzzle, Library } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) return;
        const res = await api.getProfile(user.id);
        if (res.success) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      if (user?.id) {
        fetchProfile();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  // Loading State
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6 md:p-10 flex flex-col gap-6">
          <div className="h-48 bg-[#1e1e2e] animate-pulse rounded-2xl"></div>
          <div className="h-64 bg-[#1e1e2e] animate-pulse rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-[#1e1e2e] animate-pulse rounded-2xl"></div>
            <div className="h-48 bg-[#1e1e2e] animate-pulse rounded-2xl"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6 md:p-10 flex items-center justify-center">
          <p className="text-[#9ca3af]">Failed to load profile. Please try again.</p>
        </main>
      </div>
    );
  }

  // Calculate overall mastery
  const totalAccuracy = Object.values(profile.pattern_brain).reduce((sum, p) => sum + p.accuracy, 0);
  const patternCount = Object.keys(profile.pattern_brain).length || 8;
  const mastery = Math.round(totalAccuracy / patternCount);

  // User initials
  const initials = profile.email ? profile.email.charAt(0).toUpperCase() : "U";
  
  // Formatted join date
  const joinDate = new Date(profile.joined).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 md:p-10 lg:p-12 pb-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* SECTION 1 — Profile Header */}
          <section className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] shrink-0">
                <span className="text-3xl font-bold font-space-grotesk text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {initials}
                </span>
              </div>
              
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold text-white mb-1 truncate max-w-sm">{profile.email}</h1>
                <p className="text-sm text-[#9ca3af] mb-4">
                  Member since {joinDate}
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <StatBadge icon={Flame} value={profile.streak} label="Day Streak" iconColor="#f59e0b" />
                  <StatBadge icon={Puzzle} value={profile.total_analyzed} label="Problems" iconColor="#3b82f6" />
                  <StatBadge icon={Library} value={profile.vault_count} label="Vault Entries" iconColor="#10b981" />
                </div>
              </div>
            </div>

            {/* Right Progress Ring */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#1e1e2e" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#7c3aed" 
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * mastery) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{mastery}%</span>
                </div>
              </div>
              <p className="text-xs text-[#9ca3af] mt-2 font-medium">Overall Mastery</p>
            </div>
          </section>

          {/* SECTION 2 & 3 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 flex flex-col gap-8">
              {/* Pattern Brain Map */}
              <PatternBrainMap brain={profile.pattern_brain} />
              
              {/* Activity Heatmap */}
              <ActivityHeatmap heatmapData={profile.heatmap_data} />
            </div>

            <div className="flex flex-col gap-8">
              {/* Insight Cards */}
              <InsightCards 
                brain={profile.pattern_brain}
                streak={profile.streak}
                totalAnalyzed={profile.total_analyzed}
                patternsEncountered={profile.patterns_encountered}
              />
              
              {/* Recent Activity */}
              <div>
                <h2 className="text-xl font-bold text-white mb-6 font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>Recent Problems</h2>
                <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl overflow-hidden h-full">
                  <RecentActivity data={profile.recent_activity || []} />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
