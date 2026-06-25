"use client";

import { useState } from "react";
import { Trash2, Lightbulb, Loader2 } from "lucide-react";
import { VaultEntry } from "@/lib/api";

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

interface VaultCardProps {
  entry: VaultEntry;
  onDelete: (id: string) => Promise<boolean>;
  onOpenModal: (entry: VaultEntry) => void;
}

export default function VaultCard({ entry, onDelete, onOpenModal }: VaultCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const patternColor = PATTERN_COLORS[entry.pattern] || "#7c3aed";
  const dateStr = new Date(entry.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    const success = await onDelete(entry.id);
    if (!success) {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div 
      className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 hover:border-[#7c3aed]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full relative overflow-hidden"
      onClick={() => !confirmDelete && onOpenModal(entry)}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start mb-4">
        <span 
          className="text-xs font-bold px-2.5 py-1 rounded-md"
          style={{ backgroundColor: `${patternColor}15`, color: patternColor, border: `1px solid ${patternColor}30` }}
        >
          {entry.pattern}
        </span>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b7280]">{dateStr}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }}
            className="text-[#6b7280] hover:text-[#f43f5e] transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-[#111118]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4">
          <p className="text-[#f1f0f5] font-medium mb-4">Delete this entry?</p>
          <div className="flex gap-3">
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-[#f43f5e] hover:bg-[#e11d48] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : null}
              Yes, Delete
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }}
              disabled={isDeleting}
              className="px-4 py-2 bg-[#1e1e2e] hover:bg-[#2d2d3d] text-[#f1f0f5] text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Problem Title */}
      <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 leading-snug">
        {entry.problem_title}
      </h3>

      <div className="flex flex-col gap-4 flex-1">
        {/* Recognition Signal */}
        <div>
          <p className="text-[10px] font-mono uppercase text-[#6b7280] mb-1">Recognition Signal</p>
          <p className="text-sm text-[#f1f0f5] line-clamp-2">{entry.recognition_signal}</p>
        </div>

        {/* Common Trap */}
        <div>
          <p className="text-[10px] font-mono uppercase text-[#fda4af] mb-1">Common Trap</p>
          <p className="text-sm text-[#fda4af]/70 line-clamp-2">{entry.common_trap}</p>
        </div>
      </div>

      {/* Future Trigger Box */}
      <div className="mt-5 bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-lg p-3 flex items-start gap-2">
        <Lightbulb size={16} className="text-[#f59e0b] mt-0.5 shrink-0" />
        <p className="text-sm text-[#f59e0b]/90 italic line-clamp-2 leading-relaxed">
          {entry.future_trigger}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-[#1e1e2e] flex justify-end">
        <span className="text-xs font-semibold text-[#7c3aed] hover:underline">
          View Full Details →
        </span>
      </div>
    </div>
  );
}
