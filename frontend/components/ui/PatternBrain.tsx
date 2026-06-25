"use client";

interface PatternBrainProps {
  data: Record<string, { count: number; accuracy: number }>;
  isLoading?: boolean;
}

export default function PatternBrain({ data, isLoading }: PatternBrainProps) {
  if (isLoading) {
    return (
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 h-[400px] animate-pulse" />
    );
  }

  // Define patterns in a consistent order
  const patterns = [
    "Arrays",
    "Hashing",
    "Two Pointers",
    "Sliding Window",
    "Binary Search",
    "Trees",
    "Graphs",
    "DP",
  ];

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#f1f0f5] mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Your Pattern Brain
        </h2>
        <p className="text-sm text-[#6b7280]">Patterns you've encountered so far</p>
      </div>

      <div className="flex flex-col gap-4">
        {patterns.map((pattern) => {
          // Some backend might return variations or lowercase, but we expect exact casing as requested
          const stat = data?.[pattern] || { count: 0, accuracy: 0 };
          
          let colorClass = "bg-[#374151]";
          let badgeText = "Not Started";
          let badgeClass = "bg-[#374151]/20 text-[#9ca3af] border-[#374151]/40";

          if (stat.count > 0) {
            if (stat.accuracy <= 30) {
              colorClass = "bg-[#f43f5e]";
              badgeText = "Blind Spot";
              badgeClass = "bg-[#f43f5e]/10 text-[#fda4af] border-[#f43f5e]/30";
            } else if (stat.accuracy <= 60) {
              colorClass = "bg-[#f59e0b]";
              badgeText = "Learning";
              badgeClass = "bg-[#f59e0b]/10 text-[#fcd34d] border-[#f59e0b]/30";
            } else if (stat.accuracy <= 85) {
              colorClass = "bg-[#3b82f6]";
              badgeText = "Developing";
              badgeClass = "bg-[#3b82f6]/10 text-[#93c5fd] border-[#3b82f6]/30";
            } else {
              colorClass = "bg-[#10b981]";
              badgeText = "Strong";
              badgeClass = "bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30";
            }
          }

          return (
            <div key={pattern} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-[#d1d5db] text-sm min-w-[120px]">
                    {pattern}
                  </span>
                  {stat.count > 0 && (
                    <span className="text-xs bg-[#1e1e2e] text-[#9ca3af] px-2 py-0.5 rounded-md border border-[#374151]">
                      {stat.count} problem{stat.count !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className={`text-xs px-2 py-1 rounded-md border font-medium ${badgeClass}`}>
                  {badgeText}
                </div>
              </div>
              
              <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
                  style={{ width: `${stat.count > 0 ? Math.max(5, stat.accuracy) : 0}%` }}
                />
              </div>
              
              {stat.count === 0 && (
                <p className="text-xs text-[#4b5563] mt-0.5">
                  Analyze a problem with this pattern to unlock
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
