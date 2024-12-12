export default function ChatbotToggleButton({ onClick, isOpen }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-4 z-50 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 ease-in-out"
      aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      alt="chat"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute transition-all duration-300 ease-in-out ${
            isOpen
              ? "rotate-45 opacity-0 scale-75"
              : "rotate-0 opacity-100 scale-100"
          }`}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute transition-all duration-300 ease-in-out ${
            isOpen
              ? "rotate-0 opacity-100 scale-100"
              : "-rotate-45 opacity-0 scale-75"
          }`}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </button>
  );
}
