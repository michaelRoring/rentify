"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      console.log("data :", data);

      setMessages((prev) => [
        ...prev,
        {
          text: data.response,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-6 transition-opacity duration-300 ease-in-out">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          <h1 className="text-xl font-bold mb-4 text-slate-800">
            Chat with our customer service
          </h1>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.sender === "user"
                  ? "bg-emerald-100 text-slate-500 ml-auto max-w-[80%]"
                  : "bg-gray-100 text-slate-500 mr-auto max-w-[80%]"
              }`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-700"
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
