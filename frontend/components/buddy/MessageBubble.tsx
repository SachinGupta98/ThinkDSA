import ReactMarkdown from "react-markdown";
import { Bot } from "lucide-react";

export default function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-fade-in">
        <div className="bg-[#7c3aed] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-md">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-6 animate-fade-in w-full">
      <div className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-[#2a2a4a] flex items-center justify-center shrink-0 mt-1 shadow-sm">
        <Bot size={16} className="text-[#a78bfa]" />
      </div>
      <div className="flex-1 overflow-hidden">
        <span className="text-xs font-semibold text-[#6b7280] mb-1 block tracking-wide uppercase">Btech Buddy</span>
        <div className="bg-[#1a1a2e] border border-[#2a2a4a] text-[#f1f0f5] px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm inline-block max-w-[95%]">
          <div className="text-sm leading-relaxed prose prose-invert prose-p:mb-2 prose-p:last:mb-0 prose-ul:my-2 prose-li:my-0.5 prose-a:text-[#a78bfa] prose-a:no-underline hover:prose-a:underline prose-strong:text-white max-w-none break-words">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
