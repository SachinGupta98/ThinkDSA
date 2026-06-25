"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Layers, BookOpen, Flame } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { api, UserProfile } from "@/lib/api";

import Sidebar from "@/components/ui/Sidebar";
import StatCard from "@/components/ui/StatCard";
import PatternBrain from "@/components/ui/PatternBrain";
import RecentActivity from "@/components/ui/RecentActivity";

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useUser();
  const [stats, setStats] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      try {
        const res = await api.getProfile(user.id);
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!isUserLoading) {
      if (user?.id) {
        fetchStats();
      } else {
        setLoading(false); // If no user, loading is done (they will be redirected by middleware anyway)
      }
    }
  }, [user, isUserLoading]);

  // Handle global loading state
  const isPageLoading = isUserLoading || loading;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[240px] p-6 md:p-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* SECTION 1 — Welcome Header */}
          <header>
            <p className="text-[#9ca3af] text-sm mb-1">Welcome back 👋</p>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Ready to think better today?
            </h1>
          </header>

          {/* SECTION 2 — 4 Stat Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Problems Analyzed"
              value={stats?.total_analyzed ?? 0}
              Icon={BrainCircuit}
              iconColor="#a78bfa"
              iconBg="rgba(124,58,237,0.15)"
              isLoading={isPageLoading}
            />
            <StatCard
              title="Patterns Recognized"
              value={stats?.patterns_encountered ?? 0}
              Icon={Layers}
              iconColor="#67e8f9"
              iconBg="rgba(6,182,212,0.15)"
              isLoading={isPageLoading}
            />
            <StatCard
              title="Vault Entries"
              value={stats?.vault_count ?? 0}
              Icon={BookOpen}
              iconColor="#fbbf24"
              iconBg="rgba(245,158,11,0.15)"
              isLoading={isPageLoading}
            />
            <StatCard
              title="Day Streak"
              value={stats?.streak ?? 0}
              suffix="days"
              Icon={Flame}
              iconColor="#fb7185"
              iconBg="rgba(244,63,94,0.15)"
              isLoading={isPageLoading}
            />
          </section>

          {/* SECTION 3 & 4 — Brain & Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <PatternBrain 
              data={stats?.pattern_brain ?? {}} 
              isLoading={isPageLoading} 
            />
            <RecentActivity 
              data={stats?.recent_activity ?? []} 
              isLoading={isPageLoading} 
            />
          </section>

        </div>
      </main>
    </div>
  );
}
