import { ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { initVectorStore } from "@/utils/vectorStore";

const llm = new ChatOpenAI({
  temperature: 0.7,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

let chain = null;

async function initChain() {
  if (chain) return chain;

  const vectorStore = await initVectorStore();

  chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
  return chain;
}

export default async function POST(req, res) {
  try {
    const { message } = req.body;

    const qaChain = await initChain();

    const response = await qaChain.call({
      query: message,
    });

    return res.json({ response: response.text });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal server error" }, { status: 500 });
  }
}
