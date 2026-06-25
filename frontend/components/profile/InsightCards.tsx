"use client";

import { Trophy, AlertTriangle, Flame, TrendingUp } from "lucide-react";

interface InsightCardsProps {
  brain: Record<string, { count: number; accuracy: number }>;
  streak: number;
  totalAnalyzed: number;
  patternsEncountered: number;
}

export default function InsightCards({ brain, streak, totalAnalyzed, patternsEncountered }: InsightCardsProps) {
  
  // INSIGHT 1: Strongest Pattern
  let strongestPattern = "";
  let maxAccuracy = -1;
  Object.entries(brain).forEach(([pattern, stats]) => {
    if (stats.count > 0 && stats.accuracy > maxAccuracy) {
      maxAccuracy = stats.accuracy;
      strongestPattern = pattern;
    }
  });

  // INSIGHT 2: Blind Spot
  let blindSpot = "";
  let lowestAccuracy = 101;
  const commonPatterns = ["Arrays", "Hashing", "Two Pointers", "Sliding Window", "Trees", "Graphs"];
  // Try to find a common pattern that has 0 count first
  blindSpot = commonPatterns.find(p => !brain[p] || brain[p].count === 0) || "";
  
  if (!blindSpot) {
    // Or find lowest accuracy
    Object.entries(brain).forEach(([pattern, stats]) => {
      if (stats.accuracy < lowestAccuracy) {
        lowestAccuracy = stats.accuracy;
        blindSpot = pattern;
      }
    });
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>Your Insights</h2>
        <p className="text-[#9ca3af] text-sm mt-1">Auto-generated from your activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* INSIGHT 1 — Strongest Pattern */}
        {strongestPattern ? (
          <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#22c55e] rounded-xl p-5 flex gap-4">
            <Trophy size={24} className="text-[#22c55e] shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-[#f1f0f5] text-sm mb-1">Strongest Pattern</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Your strongest pattern is <strong className="text-[#22c55e]">{strongestPattern}</strong> with {maxAccuracy}% recognition accuracy. Keep practicing to maintain it.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#22c55e] rounded-xl p-5 flex gap-4 opacity-50">
            <Trophy size={24} className="text-[#22c55e] shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-[#f1f0f5] text-sm mb-1">Strongest Pattern</h3>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                Analyze more problems to discover your strongest pattern.
              </p>
            </div>
          </div>
        )}

        {/* INSIGHT 2 — Blind Spot */}
        <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#f43f5e] rounded-xl p-5 flex gap-4">
          <AlertTriangle size={24} className="text-[#f43f5e] shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-[#f1f0f5] text-sm mb-1">Blind Spot Identified</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              {brain[blindSpot]?.count === 0 || !brain[blindSpot] 
                ? `You have never analyzed a ${blindSpot} problem. This is a common interview topic — try analyzing one today.`
                : `Your accuracy for ${blindSpot} is low (${lowestAccuracy}%). Focus your practice here.`
              }
            </p>
          </div>
        </div>

        {/* INSIGHT 3 — Streak */}
        <div className={`bg-[#111118] border border-[#1e1e2e] border-l-4 rounded-xl p-5 flex gap-4 ${streak > 0 ? 'border-l-[#f59e0b]' : 'border-l-[#4b5563]'}`}>
          <Flame size={24} className={streak > 0 ? "text-[#f59e0b]" : "text-[#4b5563]"} style={{ marginTop: '4px' }} />
          <div>
            <h3 className="font-bold text-[#f1f0f5] text-sm mb-1">Activity Streak</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              {streak > 0 
                ? `You are on a ${streak} day streak! Analyze a problem today to keep it going.`
                : `Start a streak by analyzing a problem today.`
              }
            </p>
          </div>
        </div>

        {/* INSIGHT 4 — Progress */}
        <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#7c3aed] rounded-xl p-5 flex gap-4">
          <TrendingUp size={24} className="text-[#7c3aed] shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-[#f1f0f5] text-sm mb-1">Overall Progress</h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              You have analyzed {totalAnalyzed} problems and recognized {patternsEncountered} different patterns. {totalAnalyzed > 10 ? 'Great progress!' : 'Keep going — aim for 10 problems this week.'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
