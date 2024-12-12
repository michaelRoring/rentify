"use client";
import { useState } from "react";
import ChatbotToggleButton from "./ChatbotToggleButton";
import ChatBot from "./Chatbot";

export default function ChatbotLayout() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="relative">
      <ChatbotToggleButton onClick={toggleChatbot} isOpen={isChatbotOpen} />
      {isChatbotOpen && (
        <div className="fixed bottom-20 left-1 z-50 w-full max-w-xl">
          <ChatBot />
        </div>
      )}
    </div>
  );
}
