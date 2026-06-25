"use client";

import { useState, useEffect } from "react";
import { BrainCircuit, Check, ArrowRight, Loader2, Camera } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { api, AnalysisResult } from "@/lib/api";
import Sidebar from "@/components/ui/Sidebar";

export default function AnalyzePage() {
  const { user } = useUser();
  const [problemText, setProblemText] = useState("");
  const [userCode, setUserCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("idle"); // idle, fetching, analyzing
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [extracting, setExtracting] = useState(false);

  const languages = ["C", "C++", "Python", "Java"];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    if (url) {
      setProblemText(url);
    }
  }, []);

  // URL Detection Logic
  const isUrl = problemText.trim().startsWith('http');
  const lcMatch = isUrl && problemText.includes('leetcode');
  const gfgMatch = isUrl && problemText.includes('geeksforgeeks');
  const cfMatch = isUrl && problemText.includes('codeforces');
  const hrMatch = isUrl && problemText.includes('hackerrank');

  const getPlatformName = () => {
    if (lcMatch) return "LeetCode";
    if (gfgMatch) return "GeeksforGeeks";
    if (cfMatch) return "Codeforces";
    if (hrMatch) return "HackerRank";
    return "Website";
  };

  // Switch loading text after 3 seconds if fetching URL
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading && isUrl && loadingPhase === "fetching") {
      timer = setTimeout(() => {
        setLoadingPhase("analyzing");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loading, isUrl, loadingPhase]);

  const handleAnalyze = async () => {
    if (!problemText.trim()) return;
    
    setLoading(true);
    setLoadingPhase(isUrl ? "fetching" : "analyzing");
    setError(null);
    setSuggestion(null);
    setResult(null);
    setSaved(false);
    setSaveError(null);

    try {
      const res = await api.analyze({
        problem_text: problemText,
        user_code: userCode,
        language: selectedLanguage,
        user_id: user?.id
      });
      setResult(res.data);
    } catch (err: any) {
      setError(err.message || "Analysis failed. Please try again.");
      // The API might return an error object with a suggestion string but request wrapper only gives err.message
      // Let's check if the error message contains suggestion info or we can rely on standard message.
      if (err.message && err.message.includes("paste the problem text directly")) {
        setSuggestion("Please paste the problem text directly instead.");
      }
    } finally {
      setLoading(false);
      setLoadingPhase("idle");
    }
  };

  const handleSaveToVault = async () => {
    if (!result || !user?.id) return;
    
    setSaving(true);
    setSaveError(null);

    try {
      const title = result.problem_title || problemText.split('\n')[0].substring(0, 50).trim() || "Untitled Problem";
      
      await api.saveVault({
        user_id: user.id,
        problem_text: problemText,
        analysis: result,
        title: title
      });
      setSaved(true);
    } catch (err) {
      setSaveError("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtracting(true);
    setError(null);
    setSuggestion(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const res = await api.extractTextFromImage(base64);
          if (res.success && res.text) {
            setProblemText(res.text);
          } else {
            setError(res.error || "Failed to extract text from image.");
          }
        } catch (err: any) {
          setError(err.message || "Failed to extract text from image.");
        } finally {
          setExtracting(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to read image file.");
      setExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f0f5] flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] p-6 pb-24 md:p-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* LEFT PANEL — Input Area (40%) */}
          <div className="w-full md:w-[40%] flex flex-col gap-6">
            <header>
              <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Analyze a Problem
              </h1>
              <p className="text-[#6b7280] text-sm">
                Paste any DSA problem and let ThinkDSA teach you how to think
              </p>
            </header>

            {/* INPUT 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#d1d5db]">Problem — Paste URL or Text</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    id="image-upload" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                    disabled={extracting || loading}
                  />
                  <label 
                    htmlFor="image-upload" 
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      extracting ? 'bg-[#7c3aed]/20 text-[#a78bfa] cursor-wait' : 'bg-[#1e1e2e] text-[#d1d5db] hover:bg-[#2a2a3a] border border-[#374151]'
                    }`}
                  >
                    {extracting ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                    {extracting ? "Extracting..." : "Upload Photo"}
                  </label>
                </div>
              </div>
              <textarea 
                rows={6}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Paste a problem link or text...&#10;&#10;✓ leetcode.com/problems/two-sum&#10;✓ geeksforgeeks.org/problems/...&#10;✓ codeforces.com/problemset/problem/...&#10;✓ hackerrank.com/challenges/...&#10;✓ Or just paste the problem statement directly"
                className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 text-sm text-[#f1f0f5] focus:outline-none focus:border-[#7c3aed]/50 resize-y placeholder:text-[#4b5563]"
              />
              
              {/* URL Detection Badges */}
              {isUrl && (
                <div className="mt-1 animate-fade-in">
                  {lcMatch && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
                      LeetCode problem detected — will fetch automatically
                    </span>
                  )}
                  {gfgMatch && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                      GFG problem detected
                    </span>
                  )}
                  {cfMatch && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse"></span>
                      Codeforces problem detected
                    </span>
                  )}
                  {hrMatch && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                      HackerRank problem detected
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* INPUT 2 */}
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-sm font-medium text-[#d1d5db]">Your Solution (optional)</label>
                <p className="text-xs text-[#6b7280] mt-0.5">Paste your code to get it reviewed</p>
              </div>
              <textarea 
                rows={6}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="Paste your attempted solution here...&#10;Even broken or incomplete code is fine."
                className="w-full bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 text-sm text-[#f1f0f5] font-mono focus:outline-none focus:border-[#7c3aed]/50 resize-y placeholder:text-[#4b5563]"
              />
            </div>

            {/* INPUT 3 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#d1d5db]">Code Language</label>
              <div className="flex gap-2 p-1 bg-[#111118] border border-[#1e1e2e] rounded-xl">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors ${
                      selectedLanguage === lang 
                        ? "bg-[#7c3aed] text-white" 
                        : "text-[#6b7280] hover:text-[#d1d5db] hover:bg-[#1e1e2e]/50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !problemText.trim()}
              className="w-full py-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:bg-[#374151] disabled:text-[#9ca3af] disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="animate-pulse">
                    {loadingPhase === "fetching" ? `Fetching problem from ${getPlatformName()}...` : "Analyzing with ThinkDSA AI..."}
                  </span>
                </>
              ) : (
                <>
                  <BrainCircuit size={18} className="group-hover:scale-110 transition-transform" />
                  Analyze Problem →
                </>
              )}
            </button>
          </div>

          {/* RIGHT PANEL — Analysis Output (60%) */}
          <div className="w-full md:w-[60%] flex flex-col">
            
            {/* EMPTY STATE */}
            {!loading && !result && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10 h-full min-h-[400px] border border-dashed border-[#1e1e2e] rounded-xl bg-[#111118]/50">
                <BrainCircuit size={64} className="text-[#7c3aed] opacity-20 mb-6" />
                <h3 className="text-[#d1d5db] font-medium mb-2 text-lg">Your analysis will appear here</h3>
                <p className="text-[#6b7280] text-sm">Paste a problem and click Analyze</p>
              </div>
            )}

            {/* ERROR STATE */}
            {error && !loading && (
              <div className="bg-[#111118] border border-[#f43f5e]/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#f43f5e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">⚠️</span>
                </div>
                <h3 className="text-[#fda4af] font-bold mb-2">
                  {suggestion ? "Could not fetch this problem automatically" : "Something went wrong"}
                </h3>
                <p className="text-[#f1f0f5] text-sm mb-2">{error}</p>
                {suggestion && (
                  <p className="text-[#9ca3af] text-sm mb-6">{suggestion}</p>
                )}
                
                {suggestion ? (
                  <button 
                    onClick={() => {
                      setProblemText("");
                      setError(null);
                      setSuggestion(null);
                    }}
                    className="px-5 py-2.5 bg-[#f43f5e]/10 text-[#fda4af] rounded-lg text-sm font-medium hover:bg-[#f43f5e]/20 transition-colors border border-[#f43f5e]/20"
                  >
                    Switch to Text Input
                  </button>
                ) : (
                  <button 
                    onClick={handleAnalyze}
                    className="px-5 py-2.5 bg-[#f43f5e]/10 text-[#fda4af] rounded-lg text-sm font-medium hover:bg-[#f43f5e]/20 transition-colors border border-[#f43f5e]/20"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}

            {/* LOADING STATE */}
            {loading && (
              <div className="flex flex-col gap-4">
                <div className="text-center py-4 mb-4 border border-[#1e1e2e] rounded-xl bg-[#111118]">
                  <h3 className="text-[#f1f0f5] font-medium mb-1">
                    {loadingPhase === "fetching" ? "Fetching problem details..." : "Analyzing your problem..."}
                  </h3>
                  <p className="text-[#6b7280] text-sm">This usually takes 5-10 seconds</p>
                </div>
                {[120, 200, 160, 240].map((h, i) => (
                  <div key={i} className="animate-pulse bg-[#111118] border border-[#1e1e2e] rounded-xl" style={{ height: h }}></div>
                ))}
              </div>
            )}

            {/* SUCCESS STATE */}
            {result && !loading && (
              <div className="flex flex-col gap-4 pb-12">
                
                {/* Result Header if platform exists */}
                {result.problem_title && (
                  <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-5 mb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
                    <div>
                      {result.platform && result.platform !== 'manual' && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1">
                          Fetched from {result.platform}
                        </span>
                      )}
                      <h2 className="text-lg font-bold text-white">{result.problem_title}</h2>
                    </div>
                    {result.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap self-start md:self-auto ${
                        result.difficulty.toLowerCase() === 'easy' ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20' :
                        result.difficulty.toLowerCase() === 'medium' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20' :
                        'bg-[#f43f5e]/10 text-[#f43f5e] border border-[#f43f5e]/20'
                      }`}>
                        {result.difficulty}
                      </span>
                    )}
                  </div>
                )}
                
                {/* CARD 1: Problem Decoded */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#7c3aed] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span>🔍</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Problem Decoded</h3>
                  </div>
                  <p className="text-[#f1f0f5] text-base leading-relaxed">
                    {result.problem_summary}
                  </p>
                </div>

                {/* CARD 2: Constraint Intelligence */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#06b6d4] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span>⚡</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Constraint Intelligence</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-[#1e1e2e]">
                          <th className="py-2 px-3 font-medium text-[#9ca3af]">Constraint</th>
                          <th className="py-2 px-3 font-medium text-[#9ca3af]">What This Means</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.constraint_intelligence.map((c, i) => (
                          <tr key={i} className="border-b border-[#1e1e2e]/50 last:border-0">
                            <td className="py-3 px-3 text-[#f1f0f5] font-mono text-xs">{c.constraint}</td>
                            <td className="py-3 px-3 text-[#d1d5db]">{c.meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CARD 3: Pattern Detected */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#10b981] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span>🎯</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Pattern Detected</h3>
                  </div>
                  <div className="flex justify-center mb-6">
                    <div className="bg-[#10b981]/20 border border-[#10b981]/40 text-[#34d399] px-6 py-2 rounded-full font-bold text-lg tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      {result.pattern_detected}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[#9ca3af] text-sm font-medium mb-3">Recognition Signals:</h4>
                    <ul className="flex flex-col gap-2">
                      {result.recognition_signals.map((sig, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#d1d5db]">
                          <Check size={16} className="text-[#10b981] mt-0.5 shrink-0" />
                          <span>{sig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CARD 4: Why This Pattern? */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#f59e0b] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span>🧠</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Why This Pattern?</h3>
                  </div>
                  <p className="text-[#d1d5db] text-sm leading-relaxed mb-5">
                    {result.why_this_pattern}
                  </p>
                  
                  <div className="h-px bg-[#1e1e2e] mb-5 w-full"></div>
                  
                  <h4 className="text-[#9ca3af] text-sm font-medium mb-3">Why Not These?</h4>
                  <div className="flex flex-col gap-3">
                    {result.why_not_others.map((alt, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                        <span className="bg-[#f43f5e]/10 text-[#fda4af] border border-[#f43f5e]/20 px-2 py-0.5 rounded text-xs font-medium shrink-0">
                          {alt.pattern}
                        </span>
                        <span className="text-[#6b7280] text-sm">{alt.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD 5: Decision Tree */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#8b5cf6] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <span>🌳</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Decision Tree</h3>
                  </div>
                  <div className="flex flex-col relative pl-4 border-l-2 border-dashed border-[#8b5cf6]/30 ml-2">
                    {result.algorithm_decision_tree.map((node, i) => (
                      <div key={i} className="mb-6 last:mb-0 relative">
                        <div className="absolute w-6 h-6 bg-[#8b5cf6] rounded-full flex items-center justify-center text-xs font-bold text-white -left-[29px] top-0 shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                          {i + 1}
                        </div>
                        <div className="pl-4">
                          <p className="font-medium text-[#f1f0f5] text-sm mb-1">{node.question}</p>
                          <p className="text-[#9ca3af] text-sm leading-relaxed">{node.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD 6: Code Analysis (only if applicable) */}
                {result.code_analysis?.applicable && (
                  <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#f43f5e] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center gap-2 mb-5">
                      <span>🔬</span>
                      <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Code Analysis</h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="bg-[#1e1e2e] px-4 py-2 rounded-lg border border-[#374151]">
                        <span className="text-xs text-[#9ca3af] block mb-1">Current Complexity</span>
                        <span className="font-mono font-bold text-[#f1f0f5]">{result.code_analysis.complexity.current}</span>
                      </div>
                      {result.code_analysis.complexity.current !== result.code_analysis.complexity.optimal && (
                        <ArrowRight className="text-[#6b7280]" size={20} />
                      )}
                      <div className="bg-[#10b981]/10 px-4 py-2 rounded-lg border border-[#10b981]/30">
                        <span className="text-xs text-[#34d399] block mb-1">Optimal Target</span>
                        <span className="font-mono font-bold text-[#6ee7b7]">{result.code_analysis.complexity.optimal}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {result.code_analysis.what_is_wrong && (
                        <div className="bg-[#f43f5e]/5 border border-[#f43f5e]/20 p-4 rounded-xl">
                          <h4 className="text-xs font-bold text-[#fda4af] uppercase tracking-wider mb-2">What's Wrong</h4>
                          <p className="text-sm text-[#f1f0f5]">{result.code_analysis.what_is_wrong}</p>
                        </div>
                      )}
                      
                      {result.code_analysis.what_is_right && (
                        <div className="bg-[#10b981]/5 border border-[#10b981]/20 p-4 rounded-xl">
                          <h4 className="text-xs font-bold text-[#6ee7b7] uppercase tracking-wider mb-2">What's Right</h4>
                          <p className="text-sm text-[#f1f0f5]">{result.code_analysis.what_is_right}</p>
                        </div>
                      )}

                      {result.code_analysis.logic_errors.length > 0 && (
                        <div>
                          <h4 className="text-[#fda4af] text-sm font-medium mb-2">Logic Errors:</h4>
                          <ul className="list-disc pl-5 flex flex-col gap-1">
                            {result.code_analysis.logic_errors.map((err, i) => (
                              <li key={i} className="text-sm text-[#d1d5db] marker:text-[#f43f5e]">{err}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.code_analysis.edge_cases_missed.length > 0 && (
                        <div>
                          <h4 className="text-[#fcd34d] text-sm font-medium mb-2">Edge Cases Missed:</h4>
                          <ul className="list-disc pl-5 flex flex-col gap-1">
                            {result.code_analysis.edge_cases_missed.map((edge, i) => (
                              <li key={i} className="text-sm text-[#d1d5db] marker:text-[#f59e0b]">{edge}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* CARD 7: Thinking Framework */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#f59e0b] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span>💡</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Thinking Framework</h3>
                  </div>
                  <div className="bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl p-5 shadow-inner">
                    <p className="italic text-[#fcd34d] text-base leading-relaxed">
                      "{result.thinking_framework}"
                    </p>
                  </div>
                </div>

                {/* CARD 8: Alternative Approaches */}
                <div className="bg-[#111118] border border-[#1e1e2e] border-l-4 border-l-[#3b82f6] rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-2 mb-5">
                    <span>🔄</span>
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-[#d1d5db]">Alternative Approaches</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {result.alternative_approaches.map((alt, i) => (
                      <div key={i} className="bg-[#1a1a24] p-4 rounded-lg border border-[#1e1e2e]">
                        <p className="font-bold text-[#a78bfa] text-sm mb-1">{alt.approach}</p>
                        <p className="text-[#9ca3af] text-sm">{alt.tradeoff}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SAVE TO VAULT BUTTON */}
                <div className="mt-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                  <button
                    onClick={handleSaveToVault}
                    disabled={saving || saved || !user?.id}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all border flex justify-center items-center gap-2 ${
                      saved 
                        ? "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30 cursor-default" 
                        : "bg-[#f59e0b]/5 text-[#f59e0b] border-[#f59e0b]/30 hover:bg-[#f59e0b]/10 disabled:opacity-50"
                    }`}
                  >
                    {saving ? (
                      <><Loader2 size={18} className="animate-spin" /> Saving...</>
                    ) : saved ? (
                      "✓ Saved to Vault"
                    ) : (
                      "Save to My Vault 🗃️"
                    )}
                  </button>
                  {saveError && (
                    <p className="text-center text-sm text-[#f43f5e] mt-2">{saveError}</p>
                  )}
                  {!user?.id && (
                    <p className="text-center text-xs text-[#6b7280] mt-2">Login to save analyses to your vault.</p>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
