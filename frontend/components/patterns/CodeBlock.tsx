"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  examples: {
    cpp: string;
    python: string;
    java: string;
    c: string;
  };
  problemName: string;
}

export default function CodeBlock({ examples, problemName }: CodeBlockProps) {
  const [activeLang, setActiveLang] = useState<"cpp" | "python" | "java" | "c">("python");
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: "python", name: "Python" },
    { id: "cpp", name: "C++" },
    { id: "java", name: "Java" },
    { id: "c", name: "C" },
  ] as const;

  const handleCopy = () => {
    navigator.clipboard.writeText(examples[activeLang].trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] overflow-hidden bg-[#111118]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#1a1a24] border-b border-[#1e1e2e] px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-1 bg-[#1e1e2e] text-[#a78bfa] rounded">Example</span>
          <span className="text-sm font-medium text-[#d1d5db] truncate max-w-[200px] sm:max-w-md">{problemName}</span>
        </div>
        
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex bg-[#111118] border border-[#1e1e2e] rounded-lg p-0.5">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeLang === lang.id 
                    ? "bg-[#2d2d3d] text-[#f1f0f5]" 
                    : "text-[#6b7280] hover:text-[#d1d5db]"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleCopy}
            className="p-1.5 text-[#6b7280] hover:text-[#f1f0f5] bg-[#111118] border border-[#1e1e2e] rounded-lg transition-colors ml-1"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-[#10b981]" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-[#e2e8f0]">
          <code>{examples[activeLang].trim()}</code>
        </pre>
      </div>
    </div>
  );
}
