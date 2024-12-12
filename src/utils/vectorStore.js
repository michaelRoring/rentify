import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import fs from "fs";
import path from "path";

let vectorStore = null;
let lastModifiedTime = null;

export async function initVectorStore() {
  const knowledgeBasePath = path.join(
    process.cwd(),
    "data",
    "knowledge_base.txt"
  );

  const currentModifiedTime = fs.statSync(knowledgeBasePath).mtimeMs;

  if (!vectorStore || lastModifiedTime !== currentModifiedTime) {
    try {
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const loader = new TextLoader(knowledgeBasePath);
      const docs = await loader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitDocs = await textSplitter.splitDocuments(docs);

      if (vectorStore) {
        try {
          await vectorStore.deleteCollection();
        } catch (deleteError) {
          console.warn("Error deleting previous collection:", deleteError);
        }
      }

      vectorStore = await Chroma.fromDocuments(splitDocs, embeddings, {
        collectionName: "knowledge_base",
        url: "http://localhost:8000",
        createCollection: true,
      });

      lastModifiedTime = currentModifiedTime;

      console.log("Vector store successfully reinitialized with new data.");
    } catch (error) {
      console.error("Error reinitializing vector store:", error);
      throw error;
    }
  }

  return vectorStore;
}
