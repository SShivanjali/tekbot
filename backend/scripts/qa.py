import os
os.environ["HF_HOME"] = "D:/huggingface_cache"  # ✅ Ensure Hugging Face models go here

import pickle
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()

INDEX_DIR = "../vectorstore"

# Load FAISS index
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.load_local(INDEX_DIR, embedding, allow_dangerous_deserialization=True)

# Load metadata (optional)
with open(os.path.join(INDEX_DIR, "metadata.pkl"), "rb") as f:
    metadata = pickle.load(f)

# Load lightweight HuggingFace model for Q&A
qa_pipeline = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    tokenizer="google/flan-t5-base",
    truncation=True,
)

# Continuous Q&A loop
print("🧠 Ask your questions (type 'exit' to quit):\n")

while True:
    query = input("Ask a question: ").strip()
    if query.lower() in ("exit", "quit"):
        print("👋 Exiting.")
        break

    docs = vectorstore.similarity_search(query, k=3)
    context = "\n\n".join([doc.page_content for doc in docs])
    context = context[:1500]
    prompt = f"""You are a helpful assistant. Answer the question based on the context below. Be concise, only include relevant details and do not repeat content. Use bullet points if needed.

Context: {context}

Question: {query}"""

    response = qa_pipeline(prompt, max_new_tokens=200)[0]["generated_text"]

    # ✅ Remove duplicated lines from the output
    response = "\n".join(dict.fromkeys(response.split("\n")))

    print("\n🧠 Answer:\n", response.strip(), "\n")
