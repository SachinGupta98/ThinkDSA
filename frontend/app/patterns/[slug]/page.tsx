import Link from "next/link";
import { patterns } from "@/lib/patterns/data";
import Sidebar from "@/components/ui/Sidebar";
import CodeBlock from "@/components/patterns/CodeBlock";
import { ArrowLeft, Target, AlertTriangle, CheckCircle2, ChevronRight, Activity, Zap } from "lucide-react";
import { Hash, ChevronsLeftRight, GalleryHorizontal, Divide, GitBranch, Network, TableProperties, Undo2 } from "lucide-react";

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

export default function PatternDetailPage({ params }: { params: { slug: string } }) {
  const pattern = patterns.find(p => p.slug === params.slug);

  if (!pattern) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
        <Sidebar />
        <main className="flex-1 md:ml-[240px] p-6 md:p-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-[#f43f5e] mb-4">Pattern Not Found</h1>
          <Link href="/patterns" className="px-4 py-2 bg-[#1e1e2e] rounded-lg inline-block">
            Return to Library
          </Link>
        </main>
      </div>
    );
  }

  const Icon = iconMap[pattern.icon] || Hash;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 md:p-10 lg:p-12 pb-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Navigation */}
          <Link href="/patterns" className="inline-flex items-center text-sm font-medium text-[#6b7280] hover:text-[#d1d5db] transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Library
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-[#1e1e2e] pb-10">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${pattern.color}15`, border: `1px solid ${pattern.color}30`, boxShadow: `0 0 20px ${pattern.color}10` }}
              >
                <Icon size={32} color={pattern.color} />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-space-grotesk text-[#f1f0f5] mb-2 tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {pattern.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-1 bg-[#111118] border border-[#1e1e2e] text-[#a78bfa] rounded">
                    Core Pattern
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xl text-[#9ca3af] font-medium leading-relaxed max-w-2xl">
              {pattern.tagline}
            </p>
          </header>

          <div className="flex flex-col gap-12">
            
            {/* What is it & When to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6">
                <h2 className="text-lg font-bold text-[#f1f0f5] mb-4 flex items-center gap-2">
                  <Activity size={20} className="text-[#3b82f6]" />
                  What is it?
                </h2>
                <div className="text-[#9ca3af] text-sm leading-relaxed space-y-3 whitespace-pre-line">
                  {pattern.what_is_it.trim()}
                </div>
              </div>
              
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 border-t-4" style={{ borderTopColor: pattern.color }}>
                <h2 className="text-lg font-bold text-[#f1f0f5] mb-4 flex items-center gap-2">
                  <Target size={20} color={pattern.color} />
                  When to use it
                </h2>
                <div className="text-[#9ca3af] text-sm leading-relaxed space-y-3 whitespace-pre-line">
                  {pattern.when_to_use.trim()}
                </div>
              </div>
            </div>

            {/* Recognition Signals */}
            <div>
              <h2 className="text-xl font-bold text-[#f1f0f5] mb-6 flex items-center gap-2 border-b border-[#1e1e2e] pb-4">
                <Zap size={22} className="text-[#f59e0b]" />
                Recognition Signals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pattern.recognition_signals.map((signal, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#111118] border border-[#1e1e2e] p-4 rounded-lg">
                    <CheckCircle2 size={18} className="text-[#10b981] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#d1d5db]">{signal.replace(/\s+/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Tree */}
            <div>
              <h2 className="text-xl font-bold text-[#f1f0f5] mb-6 flex items-center gap-2 border-b border-[#1e1e2e] pb-4">
                <Network size={22} className="text-[#8b5cf6]" />
                Decision Tree
              </h2>
              <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-6 sm:p-8 relative">
                <div className="absolute left-[39px] sm:left-[47px] top-10 bottom-10 w-0.5 bg-[#1e1e2e] hidden sm:block"></div>
                <div className="flex flex-col gap-8">
                  {pattern.decision_tree.map((node, i) => (
                    <div key={i} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 z-10">
                      <div className="w-8 h-8 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center font-bold shrink-0 shadow-[0_0_10px_rgba(139,92,246,0.3)] border-4 border-[#111118]">
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-[#1a1a24] border border-[#2d2d3d] p-5 rounded-lg">
                        <p className="font-bold text-[#f1f0f5] mb-4 pb-3 border-b border-[#2d2d3d]">{node.question.replace(/\s+/g, ' ')}</p>
                        <div className="flex flex-col gap-3">
                          {Object.entries(node).filter(([k]) => k !== 'question').map(([k, v]) => (
                            <div key={k} className="flex items-start gap-2">
                              <ChevronRight size={16} className="text-[#8b5cf6] mt-0.5 shrink-0" />
                              <span className="text-xs font-bold uppercase w-12 text-[#9ca3af] mt-0.5">{k.replace('_', ' ')}</span>
                              <span className="text-sm text-[#d1d5db] flex-1">{v as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Implementation & Code Examples */}
            <div>
              <h2 className="text-xl font-bold text-[#f1f0f5] mb-6 flex items-center gap-2 border-b border-[#1e1e2e] pb-4">
                <TableProperties size={22} className="text-[#06b6d4]" />
                Implementation Example
              </h2>
              <CodeBlock examples={pattern.code_examples} problemName={pattern.code_examples.problem.replace(/\s+/g, ' ')} />
              
              <div className="mt-4 flex gap-4 text-sm font-mono bg-[#111118] border border-[#1e1e2e] p-4 rounded-xl">
                <div className="flex-1 border-r border-[#1e1e2e]">
                  <span className="text-[#9ca3af] block mb-1">Time Complexity</span>
                  <span className="text-[#f1f0f5] font-bold">{pattern.complexity.time}</span>
                </div>
                <div className="flex-1 pl-2">
                  <span className="text-[#9ca3af] block mb-1">Space Complexity</span>
                  <span className="text-[#f1f0f5] font-bold">{pattern.complexity.space}</span>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div>
              <h2 className="text-xl font-bold text-[#f1f0f5] mb-6 flex items-center gap-2 border-b border-[#1e1e2e] pb-4">
                <AlertTriangle size={22} className="text-[#f43f5e]" />
                Common Traps & Mistakes
              </h2>
              <div className="bg-[#f43f5e]/5 border border-[#f43f5e]/20 rounded-xl p-6">
                <ul className="flex flex-col gap-3">
                  {pattern.common_mistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#fda4af]">
                      <span className="shrink-0 text-lg leading-none mt-0.5">•</span>
                      <span>{mistake.replace(/\s+/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practice Problems */}
            <div>
              <h2 className="text-xl font-bold text-[#f1f0f5] mb-6 flex items-center gap-2 border-b border-[#1e1e2e] pb-4">
                <BookOpen size={22} className="text-[#10b981]" />
                Curated Practice Set
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pattern.practice_problems.map((prob, i) => (
                  <a 
                    key={i} 
                    href={prob.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[#111118] border border-[#1e1e2e] rounded-xl hover:border-[#10b981]/50 hover:bg-[#10b981]/5 transition-all group"
                  >
                    <span className="text-sm font-medium text-[#f1f0f5] group-hover:text-[#10b981] transition-colors">{prob.title}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      prob.difficulty === 'Easy' ? 'bg-[#10b981]/10 text-[#34d399]' :
                      prob.difficulty === 'Medium' ? 'bg-[#f59e0b]/10 text-[#fbbf24]' :
                      'bg-[#f43f5e]/10 text-[#fb7185]'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Needed to import this icon missing from above
import { BookOpen } from "lucide-react";

export async function generateStaticParams() {
  return patterns.map((pattern) => ({
    slug: pattern.slug,
  }));
}
