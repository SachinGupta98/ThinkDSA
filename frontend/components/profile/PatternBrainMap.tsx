"use client";

import { useEffect, useState } from "react";

interface PatternBrainProps {
  brain: Record<string, { count: number; accuracy: number }>;
}

const PATTERNS = [
  "Arrays",
  "Hashing",
  "Sliding Window",
  "Two Pointers",
  "Binary Search",
  "Trees",
  "Graphs",
  "DP",
  "Backtracking"
];

const getStatusColor = (accuracy: number, count: number) => {
  if (count === 0) return { bg: "bg-[#374151]", text: "text-[#9ca3af]", pill: "bg-[#374151]", name: "Not Started" };
  if (accuracy <= 30) return { bg: "bg-[#f43f5e]", text: "text-[#f43f5e]", pill: "bg-[#f43f5e]/20 border-[#f43f5e]/30 text-[#f43f5e]", name: "Blind Spot" };
  if (accuracy <= 60) return { bg: "bg-[#f59e0b]", text: "text-[#f59e0b]", pill: "bg-[#f59e0b]/20 border-[#f59e0b]/30 text-[#f59e0b]", name: "Learning" };
  if (accuracy <= 85) return { bg: "bg-[#3b82f6]", text: "text-[#3b82f6]", pill: "bg-[#3b82f6]/20 border-[#3b82f6]/30 text-[#3b82f6]", name: "Developing" };
  return { bg: "bg-[#22c55e]", text: "text-[#22c55e]", pill: "bg-[#22c55e]/20 border-[#22c55e]/30 text-[#22c55e]", name: "Strong" };
};

export default function PatternBrainMap({ brain }: PatternBrainProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>Pattern Brain</h2>
        <p className="text-[#9ca3af] text-sm mt-1">Your recognition strength per pattern</p>
      </div>

      <div className="flex flex-col">
        {PATTERNS.map((pattern, idx) => {
          const stats = brain[pattern] || { count: 0, accuracy: 0 };
          const color = getStatusColor(stats.accuracy, stats.count);
          const isLast = idx === PATTERNS.length - 1;

          return (
            <div key={pattern} className={`flex items-center py-4 ${!isLast ? "border-b border-[#1e1e2e]" : ""}`}>
              
              {/* LEFT */}
              <div className="w-[120px] md:w-[150px] shrink-0">
                <span className="text-sm font-medium text-[#f1f0f5]">{pattern}</span>
              </div>
              
              {/* MIDDLE */}
              <div className="flex-1 px-4">
                {stats.count === 0 ? (
                  <span className="text-xs text-[#6b7280] italic">
                    Analyze a problem with this pattern to start tracking
                  </span>
                ) : (
                  <div className="h-2 w-full bg-[#1e1e2e] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${color.bg} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animate ? `${stats.accuracy}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
              
              {/* RIGHT */}
              <div className="w-[100px] md:w-[180px] shrink-0 text-right flex flex-col md:flex-row md:items-center justify-end gap-1 md:gap-3">
                <span className="text-xs text-[#6b7280] hidden md:inline-block w-[80px] text-left">
                  {stats.count} {stats.count === 1 ? 'prob' : 'probs'}
                </span>
                
                <div className="flex items-center justify-end gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color.pill}`}>
                    {color.name}
                  </span>
                  {stats.count > 0 && (
                    <span className={`text-xs font-bold w-8 text-right ${color.text}`}>
                      {stats.accuracy}%
                    </span>
                  )}
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
