"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/Sidebar";
import ChatWindow from "@/components/buddy/ChatWindow";
import { Bot, Send, PlusCircle, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { api } from "@/lib/api";

export default function BuddyPage() {
  const { user, isLoading: userLoading } = useUser();
  const [messages, setMessages] = useState<{role: "user"|"assistant", content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (userLoading) return;
      if (!user?.id) {
        setFetchingHistory(false);
        return;
      }

      try {
        const res = await api.getBuddyHistory(user.id);
        if (res.success && res.data) {
          setMessages(res.data);
        }
      } catch (err) {
        console.error("Failed to load buddy history", err);
      } finally {
        setFetchingHistory(false);
      }
    }
    loadHistory();
  }, [user, userLoading]);

  const handleNewChat = async () => {
    if (!user?.id) {
      setMessages([]);
      return;
    }
    
    setLoading(true);
    try {
      await api.clearBuddyHistory(user.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat", err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user" as const, content: text };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.buddyChat(newMessages, user?.id);
      
      if (res.success && res.response) {
        setMessages([...newMessages, { role: "assistant", content: res.response }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: res.error || "Sorry, something went wrong. Try again." }]);
      }
    } catch (err: any) {
      setMessages([...newMessages, { role: "assistant", content: err.message || "Sorry, I am having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-[#f1f0f5] overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 md:ml-[240px] flex flex-col h-full relative pb-16 md:pb-0">
        {/* HEADER */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/20 border border-[#7c3aed]/40 flex items-center justify-center">
              <Bot size={18} className="text-[#a78bfa]" />
            </div>
            <h1 className="font-bold text-lg" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Btech Buddy
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#7c3aed]/20 text-[#d8b4fe] text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-bold">
              AI Mentor
            </span>
            <button 
              onClick={handleNewChat}
              disabled={loading || fetchingHistory}
              className="flex items-center gap-1.5 bg-[#1e1e2e] hover:bg-[#2a2a3a] text-[#d1d5db] border border-[#374151] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              <PlusCircle size={14} />
              New Chat
            </button>
          </div>
        </header>
        
        {/* GRADIENT LINE */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent shrink-0 opacity-50"></div>

        {/* CHAT AREA */}
        {fetchingHistory ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Loader2 size={32} className="animate-spin text-[#7c3aed]" />
            <p className="text-[#9ca3af] text-sm mt-4">Loading your chat history...</p>
          </div>
        ) : (
          <ChatWindow 
            messages={messages} 
            loading={loading} 
            onSelectPrompt={sendMessage} 
          />
        )}

        {/* INPUT BAR */}
        <div className="w-full bg-[#0a0a0f] border-t border-[#1e1e2e] p-4 shrink-0 z-10 pb-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your Btech Buddy..."
                className="flex-1 bg-[#111118] border border-[#1e1e2e] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#7c3aed]/50 resize-none max-h-[120px] min-h-[50px]"
                rows={1}
                style={{
                  height: input ? `${Math.min(120, Math.max(50, input.split('\n').length * 20 + 30))}px` : '50px'
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="bg-[#7c3aed] text-white p-3.5 rounded-xl hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center justify-center shadow-md h-[50px] w-[50px]"
              >
                <Send size={18} className={input.trim() && !loading ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
              </button>
            </div>
            <p className="text-center text-xs text-[#6b7280] mt-3 tracking-wide">
              Btech Buddy gives advice based on your specific situation. Always verify links before solving.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
