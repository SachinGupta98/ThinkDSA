"use client";

import { Search } from "lucide-react";

interface VaultFilterProps {
  search: string;
  setSearch: (s: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

const PATTERNS = [
  "All",
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

export default function VaultFilter({ search, setSearch, activeFilter, setActiveFilter }: VaultFilterProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Bar */}
      <div className="relative w-full md:w-[60%]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-[#6b7280]" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems, patterns..."
          className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl py-3 pl-11 pr-4 text-sm text-[#f1f0f5] focus:outline-none focus:border-[#7c3aed]/50 placeholder:text-[#4b5563]"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide gap-2">
        {PATTERNS.map(pattern => (
          <button
            key={pattern}
            onClick={() => setActiveFilter(pattern)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === pattern
                ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                : "bg-[#111118] text-[#6b7280] border-[#1e1e2e] hover:text-[#d1d5db] hover:border-[#374151]"
            }`}
          >
            {pattern}
          </button>
        ))}
      </div>
    </div>
  );
}
