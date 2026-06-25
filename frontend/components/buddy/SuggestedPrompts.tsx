import { Bot } from "lucide-react";

export default function SuggestedPrompts({ onSelect }: { onSelect: (text: string) => void }) {
  const prompts = [
    "I'm a 2nd year student. Where do I start with DSA?",
    "I've been doing LeetCode for 2 months but not improving. Why?",
    "What's the difference between BFS and DFS? When to use which?",
    "Give me a 3 month DSA roadmap for placements",
    "I understand the solution after seeing it but can't solve on my own",
    "Which DSA topics are most important for Amazon interviews?"
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-12 mb-8 animate-fade-in px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
        <Bot size={32} className="text-[#a78bfa]" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        Hey 👋 I'm your Btech Buddy
      </h2>
      <p className="text-[#6b7280] text-sm text-center mb-10 max-w-md">
        Ask me anything about DSA, algorithms, interview prep, or where to start.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {prompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => onSelect(prompt)}
            className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-4 text-sm text-left text-[#d1d5db] hover:border-[#7c3aed]/50 hover:bg-[#1a1a2e] transition-all hover:-translate-y-0.5 group"
          >
            <span className="block group-hover:text-white transition-colors">{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
