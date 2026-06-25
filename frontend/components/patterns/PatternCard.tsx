"use client";

import Link from "next/link";
import { ArrowRight, Hash, ChevronsLeftRight, GalleryHorizontal, Divide, GitBranch, Network, TableProperties, Undo2 } from "lucide-react";

// Map string icon names to Lucide components
const iconMap: Record<string, any> = {
  "Hash": Hash,
  "ChevronsLeftRight": ChevronsLeftRight,
  "GalleryHorizontal": GalleryHorizontal,
  "Divide": Divide,
  "GitBranch": GitBranch,
  "Network": Network,
  "TableProperties": TableProperties,
  "Undo2": Undo2
};

interface PatternCardProps {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  iconName: string;
  analyzedCount: number;
}

export default function PatternCard({ slug, name, tagline, color, iconName, analyzedCount }: PatternCardProps) {
  const Icon = iconMap[iconName] || Hash;

  return (
    <Link href={`/patterns/${slug}`} className="group block h-full">
      <div 
        className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:border-opacity-50 relative overflow-hidden"
        style={{ borderColor: "rgba(30, 30, 46, 1)", '--hover-color': color } as React.CSSProperties}
      >
        {/* Hover Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
        />

        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          >
            <Icon size={24} color={color} />
          </div>
          {analyzedCount > 0 && (
            <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1e1e2e] text-[#9ca3af] border border-[#374151]">
              {analyzedCount} Analyzed
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-[#f1f0f5] mb-2 font-space-grotesk group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          {name}
        </h3>
        
        <p className="text-[#6b7280] text-sm flex-1 leading-relaxed">
          {tagline}
        </p>

        <div className="mt-6 flex items-center text-sm font-semibold transition-colors" style={{ color }}>
          Study Pattern
          <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </Link>
  );
}
