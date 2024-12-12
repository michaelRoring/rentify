import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

let vectorStore = null;

export async function initVectorStore() {
  if (vectorStore) return vectorStore;

  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const loader = new TextLoader(
      path.join(process.cwd(), "data", "knowledge_base.txt")
    );
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    vectorStore = await Chroma.fromDocuments(splitDocs, embeddings, {
      collectionName: "knowledge_base",
      // url: process.env.CHROMA_URL || "http://localhost:8000",
      url: "http://localhost:8000",
      createCollection: true,
    });
  } catch (error) {
    console.error("Error initializing vector store:", error);
    throw error;
  }
  return vectorStore;
}
