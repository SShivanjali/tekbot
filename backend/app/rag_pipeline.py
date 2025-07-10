import os
import pickle
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()

# Set absolute path to vectorstore
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_DIR = os.path.join(BASE_DIR, "vectorstore")

# Load FAISS and embeddings only once
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.load_local(INDEX_DIR, embedding, allow_dangerous_deserialization=True)

# Load the Q&A model
qa_pipeline = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    tokenizer="google/flan-t5-base",
    truncation=True,
)

def get_answer(query: str) -> str:
    docs = vectorstore.similarity_search(query, k=3)
    context = "\n\n".join([doc.page_content for doc in docs])
    context = context[:1500]  # truncate for model safety

    prompt = f"""You are a helpful assistant. Answer the question based on the context below. Be concise, only include relevant details and do not repeat content. Use bullet points if needed.

Context: {context}

Question: {query}"""

    response = qa_pipeline(prompt, max_new_tokens=200)[0]["generated_text"]
    return response.strip()