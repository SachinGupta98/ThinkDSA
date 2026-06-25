"use client";

import { useMemo } from "react";

interface ActivityHeatmapProps {
  heatmapData: Record<string, number>;
}

const getHeatmapColor = (count: number) => {
  if (count === 0) return "bg-[#1e1e2e]";
  if (count <= 2) return "bg-[#4c1d95]";
  if (count <= 4) return "bg-[#6d28d9]";
  return "bg-[#7c3aed]";
};

export default function ActivityHeatmap({ heatmapData }: ActivityHeatmapProps) {
  
  // Generate last 28 days
  const days = useMemo(() => {
    const result = [];
    const today = new Date();
    
    // Create an array of the last 28 days (0 to 27)
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      
      result.push({
        dateStr,
        formatted,
        count: heatmapData[dateStr] || 0
      });
    }
    return result;
  }, [heatmapData]);

  // Map into 4 rows of 7 columns.
  // The layout wants 7 columns x 4 rows. 
  // Let's arrange them row by row, so indices 0-6 are row 1, etc.
  const rows = [];
  for (let r = 0; r < 4; r++) {
    const rowDays = [];
    for (let c = 0; c < 7; c++) {
      rowDays.push(days[r * 7 + c]);
    }
    rows.push(rowDays);
  }

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-2xl p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>Activity</h2>
        <p className="text-[#9ca3af] text-sm mt-1">Last 28 Days</p>
      </div>

      {/* Days header */}
      <div className="flex gap-[4px] mb-2 px-2">
        {/* We just need 7 columns roughly aligning with the grid, but we will just place the grid directly */}
      </div>

      <div className="flex flex-col gap-[4px] w-max">
        {rows.map((row, rIndex) => (
          <div key={`row-${rIndex}`} className="flex gap-[4px]">
            {row.map((day, cIndex) => (
              <div 
                key={day.dateStr} 
                className={`relative group w-7 h-7 rounded-[4px] ${getHeatmapColor(day.count)} transition-colors cursor-pointer hover:ring-2 hover:ring-[#7c3aed]/50`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a24] border border-[#2d2d3d] text-xs text-[#f1f0f5] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                  <span className="font-semibold">{day.formatted}</span>: {day.count} problem{day.count !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2 text-xs text-[#6b7280]">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-[2px] bg-[#1e1e2e]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#4c1d95]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#6d28d9]" />
          <div className="w-3 h-3 rounded-[2px] bg-[#7c3aed]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
