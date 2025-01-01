import ChatBot from "@/components/Chatbot";
import { Layout } from "@/components-new";

export default function ChatbotPage() {
  return (
    <Layout>
      <div className="w-full max-w max-h-screen  mx-auto">
        <ChatBot />
      </div>
    </Layout>
  );
}
