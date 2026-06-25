"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { Loader2, FileSpreadsheet, ExternalLink, Brain, ChevronDown, ChevronUp } from "lucide-react";

interface Problem {
  s_no: string;
  name: string;
  is_important: boolean;
  gfg_link: string | null;
  lc_link: string | null;
}

interface Topic {
  title: string;
  problems: Problem[];
}

export default function SheetPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0])); // First topic open by default

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/data/love_babbar_450.json");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error("Failed to load sheet data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleTopic = (index: number) => {
    const newOpen = new Set(openTopics);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenTopics(newOpen);
  };

  const totalProblems = topics.reduce((acc, topic) => acc + topic.problems.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#7c3aed]" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 pb-24 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#7c3aed]/10 rounded-lg border border-[#7c3aed]/20 text-[#7c3aed]">
                  <FileSpreadsheet size={24} />
                </div>
                <h1 className="text-3xl font-bold font-space-grotesk" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  450 DSA Sheet
                </h1>
              </div>
              <p className="text-[#9ca3af] max-w-2xl text-sm leading-relaxed ml-1">
                The complete Love Babbar 450 DSA sheet. Practice these {totalProblems} structured problems to master Data Structures and Algorithms for product-based company interviews.
              </p>
            </div>
            
            <a 
              href="https://youtube.com/channel/UCQHLxxBFrbfdrk1jF0moTpw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#ff0000]/10 text-[#ff4444] border border-[#ff0000]/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#ff0000]/20 transition-colors shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Love Babbar
            </a>
          </header>

          {/* Topics List */}
          <div className="flex flex-col gap-4 pb-12">
            {topics.map((topic, index) => {
              const isOpen = openTopics.has(index);
              
              return (
                <div key={index} className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden shadow-sm">
                  
                  {/* Topic Header */}
                  <button 
                    onClick={() => toggleTopic(index)}
                    className="w-full flex items-center justify-between p-5 hover:bg-[#1a1a24] transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#1e1e2e] text-[#a78bfa] flex items-center justify-center font-bold text-sm border border-[#2a2a3a]">
                        {index + 1}
                      </div>
                      <div>
                        <h2 className="font-bold text-lg text-white">{topic.title}</h2>
                        <span className="text-xs text-[#6b7280]">{topic.problems.length} Problems</span>
                      </div>
                    </div>
                    <div className="text-[#6b7280]">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Problems Table */}
                  {isOpen && (
                    <div className="border-t border-[#1e1e2e] overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#0a0a0f] text-[#9ca3af] text-xs uppercase border-b border-[#1e1e2e]">
                          <tr>
                            <th className="px-6 py-3 font-medium">#</th>
                            <th className="px-6 py-3 font-medium">Problem</th>
                            <th className="px-6 py-3 font-medium text-center">Practice</th>
                            <th className="px-6 py-3 font-medium text-right">Analyze</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e1e2e]">
                          {topic.problems.map((prob, pIdx) => {
                            const linkToAnalyze = prob.lc_link || prob.gfg_link;
                            
                            return (
                              <tr key={pIdx} className="hover:bg-[#1a1a24]/50 transition-colors">
                                <td className="px-6 py-4 text-[#6b7280] whitespace-nowrap w-12">
                                  {prob.s_no}
                                </td>
                                <td className="px-6 py-4 text-[#d1d5db]">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-medium">{prob.name}</span>
                                    {prob.is_important && (
                                      <span className="bg-[#ffaa00]/10 text-[#ffb020] text-[10px] px-1.5 py-0.5 rounded-full font-bold tracking-wide uppercase border border-[#ffaa00]/20">
                                        IMP
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-center gap-2">
                                    {prob.gfg_link ? (
                                      <a href={prob.gfg_link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#1e1e2e] hover:bg-[#2a2a3a] border border-[#2a2a3a] hover:border-[#4caf50]/50 flex items-center justify-center text-[#4caf50] transition-colors group" title="Solve on GFG">
                                        <span className="text-[10px] font-bold">GFG</span>
                                      </a>
                                    ) : (
                                      <div className="w-8 h-8 rounded border border-[#1e1e2e] flex items-center justify-center opacity-30 cursor-not-allowed">
                                        <span className="text-[10px] font-bold text-[#6b7280]">GFG</span>
                                      </div>
                                    )}
                                    
                                    {prob.lc_link && prob.lc_link !== "—" ? (
                                      <a href={prob.lc_link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-[#1e1e2e] hover:bg-[#2a2a3a] border border-[#2a2a3a] hover:border-[#f5b800]/50 flex items-center justify-center text-[#f5b800] transition-colors" title="Solve on LeetCode">
                                        <span className="text-[10px] font-bold">LC</span>
                                      </a>
                                    ) : (
                                      <div className="w-8 h-8 rounded border border-[#1e1e2e] flex items-center justify-center opacity-30 cursor-not-allowed">
                                        <span className="text-[10px] font-bold text-[#6b7280]">LC</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {linkToAnalyze && linkToAnalyze !== "—" ? (
                                    <a 
                                      href={`/analyze?url=${encodeURIComponent(linkToAnalyze)}`}
                                      className="inline-flex items-center gap-1.5 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                    >
                                      <Brain size={14} />
                                      Analyse Now
                                    </a>
                                  ) : (
                                    <span className="text-xs text-[#6b7280] italic">No Link</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
