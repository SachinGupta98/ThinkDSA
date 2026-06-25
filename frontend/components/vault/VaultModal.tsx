"use client";

import { useEffect } from "react";
import { X, AlertTriangle, Lightbulb, Zap, Network, ArrowRight } from "lucide-react";
import { VaultEntry } from "@/lib/api";
import Link from "next/link";

const PATTERN_COLORS: Record<string, string> = {
  "Arrays": "#3b82f6",
  "Hashing": "#22c55e",
  "Sliding Window": "#14b8a6",
  "Two Pointers": "#7c3aed",
  "Binary Search": "#f59e0b",
  "Trees": "#10b981",
  "Graphs": "#f43f5e",
  "DP": "#f97316",
  "Backtracking": "#ec4899"
};

interface VaultModalProps {
  entry: VaultEntry;
  onClose: () => void;
}

export default function VaultModal({ entry, onClose }: VaultModalProps) {
  const patternColor = PATTERN_COLORS[entry.pattern] || "#7c3aed";
  const dateStr = new Date(entry.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#111118] border border-[#1e1e2e] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-full text-[#9ca3af] hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8 border-b border-[#1e1e2e] pb-6 pr-10">
            <span 
              className="inline-block text-xs font-bold px-3 py-1 rounded-md mb-4"
              style={{ backgroundColor: `${patternColor}15`, color: patternColor, border: `1px solid ${patternColor}30` }}
            >
              {entry.pattern}
            </span>
            <h2 className="text-2xl font-bold text-white mb-2 leading-snug">{entry.problem_title}</h2>
            <p className="text-sm text-[#6b7280]">Saved on {dateStr}</p>
          </div>

          <div className="flex flex-col gap-8">
            
            {/* Recognition Signal */}
            <div>
              <h3 className="text-xs font-mono uppercase text-[#a78bfa] mb-3 flex items-center gap-2">
                <Zap size={14} /> Recognition Signal
              </h3>
              <p className="text-[#f1f0f5] text-[15px] leading-relaxed bg-[#1a1a24] p-4 rounded-xl border border-[#2d2d3d]">
                {entry.recognition_signal}
              </p>
            </div>

            {/* Common Trap */}
            <div>
              <h3 className="text-xs font-mono uppercase text-[#fda4af] mb-3 flex items-center gap-2">
                <AlertTriangle size={14} /> Common Trap
              </h3>
              <div className="text-[#fda4af]/90 text-[15px] leading-relaxed bg-[#f43f5e]/5 p-4 rounded-xl border border-[#f43f5e]/20 flex items-start gap-3">
                <AlertTriangle size={18} className="shrink-0 mt-0.5 text-[#f43f5e]" />
                <p>{entry.common_trap}</p>
              </div>
            </div>

            {/* Future Trigger */}
            <div>
              <h3 className="text-xs font-mono uppercase text-[#fcd34d] mb-3 flex items-center gap-2">
                <Lightbulb size={14} /> Future Trigger
              </h3>
              <div className="text-[#f59e0b]/90 text-[15px] leading-relaxed bg-[#f59e0b]/5 p-5 rounded-xl border border-[#f59e0b]/20 flex items-start gap-3 shadow-inner">
                <Lightbulb size={20} className="shrink-0 mt-0.5 text-[#f59e0b]" />
                <p className="italic font-medium">{entry.future_trigger}</p>
              </div>
            </div>

            {/* Thinking Framework */}
            <div>
              <h3 className="text-xs font-mono uppercase text-[#6ee7b7] mb-3 flex items-center gap-2">
                <Network size={14} /> Thinking Framework
              </h3>
              <p className="text-[#f1f0f5] text-[15px] leading-loose italic border-l-4 border-[#10b981] pl-4">
                "{entry.thinking_framework}"
              </p>
            </div>

            {/* Alternative Approaches */}
            {entry.alternative_approaches && entry.alternative_approaches.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase text-[#c084fc] mb-3">
                  Alternative Approaches
                </h3>
                <div className="flex flex-col gap-3">
                  {entry.alternative_approaches.map((alt, idx) => (
                    <div key={idx} className="bg-[#1a1a24] border border-[#2d2d3d] rounded-lg p-4">
                      <p className="font-bold text-[#c084fc] text-sm mb-1">{alt.approach}</p>
                      <p className="text-[#9ca3af] text-sm leading-relaxed">{alt.tradeoff}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="pt-6 mt-2 border-t border-[#1e1e2e]">
              <Link 
                href="/analyze"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[#a78bfa] font-bold border border-[#a78bfa]/30 hover:bg-[#a78bfa]/10 transition-colors"
              >
                Analyze Similar Problem <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
