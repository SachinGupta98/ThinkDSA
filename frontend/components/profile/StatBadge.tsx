"use client";

import { LucideIcon } from "lucide-react";

interface StatBadgeProps {
  icon: LucideIcon;
  value: number;
  label: string;
  iconColor?: string;
}

export default function StatBadge({ icon: Icon, value, label, iconColor = "#7c3aed" }: StatBadgeProps) {
  return (
    <div className="bg-[#1a1a24] rounded-full px-4 py-2 flex items-center gap-2 border border-[#2d2d3d]">
      <Icon size={16} color={iconColor} />
      <span className="text-[#f1f0f5] font-bold text-sm">{value}</span>
      <span className="text-[#9ca3af] text-sm">{label}</span>
    </div>
  );
}
