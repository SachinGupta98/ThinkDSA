import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";
import { Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSelectPrompt: (text: string) => void;
}

export default function ChatWindow({ messages, loading, onSelectPrompt }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth" ref={scrollRef}>
      <div className="max-w-3xl mx-auto w-full flex flex-col">
        {messages.length === 0 ? (
          <SuggestedPrompts onSelect={onSelectPrompt} />
        ) : (
          <div className="flex flex-col gap-2 w-full pt-4 pb-20">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            
            {loading && (
              <div className="flex gap-4 mb-6 animate-fade-in w-full">
                <div className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot size={16} className="text-[#a78bfa]" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-xs font-semibold text-[#6b7280] mb-1 block tracking-wide uppercase">Btech Buddy</span>
                  <div className="bg-[#1a1a2e] border border-[#2a2a4a] text-[#f1f0f5] px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm inline-block">
                    <div className="flex gap-1.5 items-center h-5">
                      <div className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
