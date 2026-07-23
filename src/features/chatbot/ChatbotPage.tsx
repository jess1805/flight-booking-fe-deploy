import { useState } from "react";
import { useAskChatbot } from "./api/useChatbot";
import type { ChatMessage } from "../../types";
import { MessageCircle, Plane, Send } from "lucide-react";
import { TwoToneHeading } from "../../components/TwoToneHeading";

// bold markdown -> strong
function renderMarkdownBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const askChatbot = useAskChatbot();

  async function handleSend() {
    const message = input.trim();
    if (!message) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await askChatbot.mutateAsync(message);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.answer,
        citations: res.citations,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong answering that. Please try again.",
        },
      ]);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto flex h-[85vh] w-full max-w-2xl flex-col">
        {/* header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
            <MessageCircle size={26} className="text-white" />
          </div>
          <div>
            <TwoToneHeading first="Feedback" second="assistant" className="text-3xl font-bold" />
            <p className="mt-2 text-slate-400">
              Ask about customer feedback — by flight, route, category, or rating.
            </p>
          </div>
        </div>

        {/* message list + input */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-sm text-slate-400">
                Try: "What feedback did we receive for flight AI203?"
              </p>
            )}

            {messages.map((message) => {
              const isInsufficient =
                message.role === "assistant" && message.citations?.length === 0;

              return (
                <div
                  key={message.id}
                  className={message.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={
                      "inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                      (message.role === "user"
                        ? "bg-teal-600 text-white"
                        : isInsufficient
                        ? "border border-amber-300 bg-amber-50 text-amber-900"
                        : "bg-slate-100 text-slate-900")
                    }
                  >
                    <p>
                      {message.role === "assistant"
                        ? renderMarkdownBold(message.content)
                        : message.content}
                    </p>

                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-3 space-y-2 text-left">
                        <p className="text-xs font-medium text-slate-500">Sources:</p>
                        <ul className="space-y-2">
                          {message.citations.map((citation, i) => (
                            <li
                              key={i}
                              className="rounded-lg border border-teal-100 bg-teal-50 px-3 py-2 text-xs"
                            >
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-slate-700">
                                  {citation.flightNumber}
                                </span>
                                <span className="text-slate-500">
                                  {citation.origin} → {citation.destination}
                                </span>
                                <span className="text-slate-500">· {citation.category}</span>
                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1.5 text-[11px] font-semibold text-white">
                                  {citation.rating}
                                </span>
                              </div>
                              <p className="mt-1 italic text-slate-600">"{citation.snippet}"</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {askChatbot.isPending && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-teal-600" />
                Looking through feedback…
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about customer feedback…"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <button
              onClick={handleSend}
              disabled={askChatbot.isPending || !input.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800 disabled:opacity-50"
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </div>

        {/* footer line */}
        <div className="mt-6 flex items-center justify-center gap-2 text-teal-500">
          <Plane size={16} />
          <span className="text-sm">Ask anything about what passengers are telling us.</span>
        </div>
      </div>
    </div>
  );
}
