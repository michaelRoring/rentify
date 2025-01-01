"use client";
import { useState } from "react";
import ChatbotToggleButton from "./ChatbotToggleButton";
import ChatBot from "./Chatbot";
import { ChatProvider } from "@/context/ChatContext";

export default function ChatbotLayout() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <ChatProvider>
      <div className="relative">
        <ChatbotToggleButton onClick={toggleChatbot} isOpen={isChatbotOpen} />
        {isChatbotOpen && (
          <div className="fixed bottom-20 left-4 z-50  max-w-xl">
            <ChatBot />
          </div>
        )}
      </div>
      //{" "}
    </ChatProvider>
  );
}
