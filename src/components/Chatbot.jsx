"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import getTimestamp from "@/utils/getTimestamp";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { chatHistory, setChatHistory } = useChat();
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [chatHistory]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const time = getTimestamp();

    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user", time };
    setInput("");
    setIsLoading(true);

    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage = { text: data.response, sender: "bot", time };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Error: Could not get a response.",
        sender: "bot",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-6 transition-opacity duration-300 ease-in-out">
        <div
          className="h-96 overflow-y-auto mb-4 space-y-1.5"
          ref={chatContainerRef}
        >
          <h1 className="text-2xl font-extrabold mb-6  text-teal-800">
            Chat with our customer service
            <hr />
          </h1>

          {chatHistory.map((message, index) => (
            <>
              <div
                key={index}
                className={`px-2.5 py-1 rounded-lg ${
                  message.sender === "user"
                    ? "bg-teal-600 text-slate-100 ml-auto w-fit text-right text-sm "
                    : "bg-slate-700 text-slate-100 mr-auto w-fit text-left text-sm"
                }`}
              >
                {message.text}
              </div>
              {message.sender === "user" ? (
                <>
                  <h1 className="text-slate-400 text-right font-thin !important text-xs">
                    You - {message?.time}
                  </h1>
                </>
              ) : (
                <h1 className="text-slate-400 text-left font-thin text-xs ">
                  Chatbot - {message?.time}
                </h1>
              )}
            </>
          ))}

          {isLoading && (
            <div className="">
              <div className="animate-pulse text-slate-400 italic">
                replying...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-teal-300 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-900 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
