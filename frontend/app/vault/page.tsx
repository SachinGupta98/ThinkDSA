"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { api, VaultEntry } from "@/lib/api";
import Sidebar from "@/components/ui/Sidebar";
import VaultFilter from "@/components/vault/VaultFilter";
import VaultCard from "@/components/vault/VaultCard";
import VaultModal from "@/components/vault/VaultModal";
import { BookOpen, Loader2 } from "lucide-react";

export default function VaultPage() {
  const { user, isLoading: authLoading } = useUser();
  const [entries, setEntries] = useState<VaultEntry[]>([]);
  const [filtered, setFiltered] = useState<VaultEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  
  const [selectedEntry, setSelectedEntry] = useState<VaultEntry | null>(null);

  useEffect(() => {
    const fetchVault = async () => {
      try {
        if (!user?.id) return;
        const res = await api.getVault(user.id);
        if (res.success) {
          setEntries(res.data);
          setFiltered(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch vault:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      if (user?.id) {
        fetchVault();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  // Handle Search and Filter
  useEffect(() => {
    let result = entries;

    // Apply Pattern Filter
    if (activeFilter !== "All") {
      result = result.filter(e => e.pattern === activeFilter);
    }

    // Apply Search
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(e => 
        e.problem_title.toLowerCase().includes(q) ||
        e.pattern.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [search, activeFilter, entries]);

  const handleDelete = async (id: string) => {
    try {
      const res = await api.deleteVault(id);
      if (res.success) {
        // Remove from local state instantly
        setEntries(prev => prev.filter(e => e.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete entry", err);
      return false;
    }
  };

  // Render auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#7c3aed]" />
        </main>
      </div>
    );
  }

  // Render completely empty state
  const isCompletelyEmpty = !loading && entries.length === 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 md:p-10 lg:p-12 pb-24 min-h-screen flex flex-col relative">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          
          {/* SECTION 1 — Page Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-space-grotesk tracking-tight text-white mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Knowledge Vault
              </h1>
              <p className="text-[#9ca3af] text-sm">
                Your personal DSA brain — every pattern you've learned, saved forever.
              </p>
            </div>
            {!loading && entries.length > 0 && (
              <div className="bg-[#7c3aed] text-white text-sm font-bold px-4 py-1.5 rounded-full shrink-0 self-start sm:self-auto shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                {entries.length} entries
              </div>
            )}
          </header>

          {/* SECTION 2 — Search + Filter Bar */}
          {!isCompletelyEmpty && (
            <VaultFilter 
              search={search} 
              setSearch={setSearch} 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
          )}

          {/* SECTION 3 — Vault Cards Grid */}
          <div className="flex-1 flex flex-col">
            
            {/* LOADING STATE */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-[#1e1e2e] animate-pulse rounded-xl h-48 border border-[#2d2d3d]"></div>
                ))}
              </div>
            )}

            {/* EMPTY STATE (no entries at all) */}
            {isCompletelyEmpty && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 border border-dashed border-[#1e1e2e] rounded-2xl bg-[#111118]/50">
                <BookOpen size={64} className="text-[#7c3aed] opacity-30 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Your vault is empty</h3>
                <p className="text-[#6b7280] max-w-md mx-auto mb-8">
                  Analyze a problem to start building your personal DSA brain.
                </p>
                <Link 
                  href="/analyze"
                  className="px-6 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold rounded-xl transition-colors shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                >
                  Analyze a Problem
                </Link>
              </div>
            )}

            {/* EMPTY SEARCH STATE */}
            {!loading && !isCompletelyEmpty && filtered.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 mt-4 bg-[#111118] border border-[#1e1e2e] rounded-xl">
                <h3 className="text-lg font-bold text-white mb-2">No entries match your search</h3>
                <p className="text-[#6b7280] mb-6">Try a different pattern or keyword.</p>
                <button 
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                  className="px-4 py-2 bg-[#1e1e2e] hover:bg-[#2d2d3d] text-[#f1f0f5] font-medium rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* GRID CONTENT */}
            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(entry => (
                  <VaultCard 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={handleDelete} 
                    onOpenModal={setSelectedEntry} 
                  />
                ))}
              </div>
            )}
            
          </div>
        </div>
      </main>

      {/* MODAL */}
      {selectedEntry && (
        <VaultModal 
          entry={selectedEntry} 
          onClose={() => setSelectedEntry(null)} 
        />
      )}
      
    </div>
  );
}
