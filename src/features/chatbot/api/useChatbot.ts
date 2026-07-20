import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import type { Citation } from "../../../types";

interface ChatbotResponse {
  answer: string;
  citations: Citation[];
}

interface ChatbotEnvelope {
  data: ChatbotResponse;
}

export function useAskChatbot() {
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await apiClient.post<ChatbotEnvelope>("/chatbot/query", {
        message,
      });
      return res.data.data;
    },
  });
}
