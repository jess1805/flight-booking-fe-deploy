import { useState } from "react";
import { useAskChatbot } from "./api/useChatbot";
import type { ChatMessage } from "../../types";

export function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const askChatbot = useAskChatbot();

  async function handleSend() {
    const question = input.trim();
    if (!question) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await askChatbot.mutateAsync(question);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.insufficientInfo
          ? "I don't have enough feedback data to answer that confidently."
          : res.answer,
        references: res.references,
        insufficientInfo: res.insufficientInfo,
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
    <div className="mx-auto flex h-[85vh] w-full max-w-2xl flex-col px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">Feedback assistant</h1>
      <p className="mb-4 text-sm text-slate-500">
        Ask about customer feedback — by flight, route, category, or time period.
      </p>

      <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border border-slate-200 p-4">
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">
            Try: "What feedback did we receive for Flight AI-203 during June 2026?"
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={
                "inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm " +
                (message.role === "user"
                  ? "bg-slate-900 text-white"
                  : message.insufficientInfo
                  ? "border border-amber-300 bg-amber-50 text-amber-900"
                  : "bg-slate-100 text-slate-900")
              }
            >
              <p>{message.content}</p>

              {message.references && message.references.length > 0 && (
                <div className="mt-2 border-t border-slate-300 pt-2 text-xs text-slate-500">
                  <p className="mb-1 font-medium">Sources:</p>
                  <ul className="space-y-0.5">
                    {message.references.map((ref) => (
                      <li key={ref.feedbackId}>
                        {ref.feedbackId} · Flight {ref.flightNumber} · {ref.category} · Rating{" "}
                        {ref.rating} · {ref.travelDate}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {askChatbot.isPending && (
          <p className="text-sm text-slate-400">Looking through feedback…</p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about customer feedback…"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={askChatbot.isPending || !input.trim()}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
