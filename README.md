# TekBot – AI Chatbot for Tekweiser

TekBot is an AI-powered chatbot built with Next.js (frontend) and FastAPI (backend). It uses Retrieval-Augmented Generation (RAG) to answer user queries about Tekweiser by leveraging local vector embeddings and a language model.

---

## Features

- Semantic search over company content  
- Answer generation with Flan-T5  
- Vector embeddings via HuggingFace models  
- Clean modern UI with Next.js and Tailwind CSS  
- CORS-enabled API for smooth integration

---

## Setup Instructions

### 1️. Clone the repository

```bash
git clone https://github.com/SShivanjali/tekbot.git
cd tekbot
```

### 2️. Prepare the backend
Python 3.10+ recommended

Install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3️. Create your .env file
In backend/.env:

```bash
OPENAI_API_KEY=your_openai_key_here
```
You can also set HF_HOME if you want to store model files elsewhere.

### 4️. Ingest Knowledge Base
This step converts text files into a searchable vector index:
```
bash
cd backend/scripts
python ingest.py
```

### 5️⃣ Start the FastAPI server
```bash
cd ..
uvicorn app.main:app --reload
```

This will run at:
```bash
http://127.0.0.1:8000
```

Test locally:

```bash
curl -X POST "http://127.0.0.1:8000/chat" \
    -H "Content-Type: application/json" \
    -d "{\"message\": \"What services does Tekweiser offer?\"}"
```

### 6️⃣ Start the frontend
In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Visit:
```bash
http://localhost:3000
```

### How It Works
- **ingest.py** loads _**.txt**_ content, chunks it, generates embeddings with _**sentence-transformers**_, and saves to FAISS.

- **rag_pipeline.py**:

    - On a question, searches top-k relevant chunks.
    - Prepares a prompt with context.
    - Calls Flan-T5 to generate an answer.

- **main.py** exposes _**/chat**_ API to receive messages and return answers.

### Credits
Made by Shivanjali Srivastav and Milonee, as part of the Web Development Internship at Tekweiser.


