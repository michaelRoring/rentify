import ChatBot from "@/components/Chatbot";
import { ChatProvider } from "@/context/ChatContext";
import { Layout } from "@/components-new";

export default function ChatbotPage() {
  return (
    <Layout>
      <ChatProvider>
        <div className="w-full max-w max-h-screen  mx-auto">
          <ChatBot />
        </div>
      </ChatProvider>
    </Layout>
  );
}
