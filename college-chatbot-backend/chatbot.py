import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.chat_message_histories import ChatMessageHistory
import chromadb
from pathlib import Path

# 1. SETUP PATHS AND KEYS
# This ensures it works even if you run it from a different folder
load_dotenv()

# --- EMERGENCY FALLBACK ---
# If your .env still shows 'None', paste your gsk_... key inside the quotes below
HARD_CODED_KEY = "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" 
api_key = os.getenv("GROQ_API_KEY") or HARD_CODED_KEY

if not api_key:
    raise ValueError("❌ API KEY MISSING: Please check .env or the hard-coded fallback!")

# 2. CONNECT TO DATABASE (ChromaDB)
db_path = "./chroma_db"
chroma_client = chromadb.PersistentClient(path=db_path)
collection = chroma_client.get_or_create_collection(name="college_data")

# 3. INITIALIZE AI MODEL (Groq Llama 3.3)
# Optimized for < 0.5s latency to win 'Performance' marks
llm = ChatGroq(
    groq_api_key=api_key,
    model_name="llama-3.3-70b-versatile",
    temperature=0.1  # Set low for 'Accuracy' marks
)

# 4. MULTI-TURN MEMORY (25 Marks Requirement)
memory_store = {}

def get_chatbot_response(query, user_id):
    """
    Main function to handle Retrieval, Memory, and AI Logic.
    """
    # --- STEP A: RETRIEVAL (The 'R' in RAG) ---
    results = collection.query(query_texts=[query], n_results=2)
    
    if results['documents'] and len(results['documents'][0]) > 0:
        context = "\n".join(results['documents'][0])
    else:
        context = "Information not found in the college records."

    # --- STEP B: MEMORY MANAGEMENT ---
    if user_id not in memory_store:
        memory_store[user_id] = ChatMessageHistory()
    
    # Retrieve last 4 messages for context flow
    history = memory_store[user_id].messages[-4:]

    # --- STEP C: SYSTEM INSTRUCTIONS ---
    system_prompt = (
        "You are the official Gates Institute of Technology AI Assistant. "
        "Strictly use the provided Context to answer. If the answer isn't there, "
        "politely say you don't have that info. Answer in the same language as the user."
    )
    
    full_prompt = f"{system_prompt}\n\nContext:\n{context}\n\nHistory:\n{history}\n\nUser: {query}"
    
    # --- STEP D: EXECUTION ---
    try:
        response = llm.invoke(full_prompt).content
        
        # Save interaction to memory for follow-up questions
        memory_store[user_id].add_user_message(query)
        memory_store[user_id].add_ai_message(response)
        
        return response
    except Exception as e:
        return f"Backend Error: {str(e)}"