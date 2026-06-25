"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BrainCircuit } from "lucide-react";

interface ActivityItem {
  id?: string;
  title: string;
  pattern: string;
  time_ago: string;
}

interface RecentActivityProps {
  data: ActivityItem[];
  isLoading?: boolean;
}

export default function RecentActivity({ data, isLoading }: RecentActivityProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 h-[400px] animate-pulse" />
    );
  }

  // Helper to colorize badges loosely based on pattern
  const getBadgeColor = (pattern: string) => {
    const p = pattern.toLowerCase();
    if (p.includes("array") || p.includes("hash")) return "bg-[#7c3aed]/10 text-[#c4b5fd] border-[#7c3aed]/30";
    if (p.includes("tree") || p.includes("graph")) return "bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30";
    if (p.includes("dp") || p.includes("dynamic")) return "bg-[#f59e0b]/10 text-[#fcd34d] border-[#f59e0b]/30";
    if (p.includes("pointer") || p.includes("window")) return "bg-[#06b6d4]/10 text-[#67e8f9] border-[#06b6d4]/30";
    return "bg-[#374151]/20 text-[#9ca3af] border-[#374151]/40";
  };

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#f1f0f5] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Recent Activity
        </h2>
        <p className="text-sm text-[#6b7280]">Your latest analyzed problems</p>
      </div>

      {data.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-[#1e1e2e] rounded-xl bg-[#0a0a0f]/50">
          <div className="w-12 h-12 rounded-xl bg-[#1e1e2e] flex items-center justify-center mb-4">
            <BrainCircuit size={24} className="text-[#6b7280]" />
          </div>
          <h3 className="text-[#d1d5db] font-medium mb-1">No problems analyzed yet</h3>
          <p className="text-[#6b7280] text-sm mb-6 max-w-[250px]">
            Analyze your first problem to see your activity here
          </p>
          <button
            onClick={() => router.push('/analyze')}
            className="px-5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg text-sm font-medium transition-colors"
          >
            Analyze a Problem
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((item, i) => (
            <div 
              key={item.id || i}
              onClick={() => router.push(`/vault/${item.id || ''}`)}
              className="group flex items-center justify-between p-4 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 cursor-pointer transition-all"
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-medium text-[#f1f0f5] text-sm group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border ${getBadgeColor(item.pattern)}`}>
                    {item.pattern}
                  </span>
                  <span className="text-xs text-[#6b7280]">
                    {item.time_ago}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#4b5563] group-hover:text-[#a78bfa] transition-colors group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
