"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  suffix?: string;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  Icon,
  iconColor,
  iconBg,
  suffix,
  isLoading,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 h-28 animate-pulse" />
    );
  }

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={20} color={iconColor} />
        </div>
        <div className="text-sm font-medium text-[#6b7280]">
          {title}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-bold text-3xl text-[#f1f0f5]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {value}
        </span>
        {suffix && (
          <span className="text-sm text-[#6b7280]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
