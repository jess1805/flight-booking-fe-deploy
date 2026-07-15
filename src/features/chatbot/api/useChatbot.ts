import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import type { FeedbackReference } from "../../../types";

// NOTE: /admin/chatbot/query is not in your current backend's endpoint list —
// the README says the old RAG/chatbot code was removed. You'll need to add
// this endpoint back (Manager/Staff-authenticated) before this page will work.
interface ChatbotResponse {
  answer: string;
  references: FeedbackReference[];
  insufficientInfo: boolean;
}

export function useAskChatbot() {
  return useMutation({
    mutationFn: async (question: string) => {
      const res = await apiClient.post<ChatbotResponse>("/admin/chatbot/query", {
        question,
      });
      return res.data;
    },
  });
}
