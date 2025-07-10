import os
import glob
import pickle
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings

DATA_DIR = "../data"
INDEX_DIR = "../vectorstore"

# Load all .txt files from the data directory
docs = []
for filepath in glob.glob(os.path.join(DATA_DIR, "*.txt")):
    loader = TextLoader(filepath, encoding="utf-8")
    docs.extend(loader.load())

# Split text into chunks for better embedding
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(docs)

# Use HuggingFace embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Create FAISS index
vectorstore = FAISS.from_documents(chunks, embeddings)

# Save FAISS index locally
os.makedirs(INDEX_DIR, exist_ok=True)
vectorstore.save_local(INDEX_DIR)

# Also save metadata with pickle (optional)
with open(os.path.join(INDEX_DIR, "metadata.pkl"), "wb") as f:
    pickle.dump({"sources": [doc.metadata for doc in chunks]}, f)

print("✅ FAISS vector store created and saved using HuggingFace embeddings.")
