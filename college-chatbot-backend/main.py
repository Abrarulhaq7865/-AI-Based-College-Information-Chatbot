import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# --- 1. INITIALIZE ENGINE ---
app = FastAPI(title="Gates Neural Core v5.0 - PDF Ready")

# SECURITY: Enable CORS so Abrar's Next.js can talk to this Python server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. THE MASTER DATA PATH ---
# Using the absolute path to avoid "File Not Found" errors
MASTER_PATH = r"D:\college chatbot ui\college-chatbot-backend\gates_data.csv"

def load_master_data():
    if not os.path.exists(MASTER_PATH):
        print(f"❌ CRITICAL ERROR: File not found at {MASTER_PATH}")
        return pd.DataFrame()
    
    try:
        df = pd.read_csv(MASTER_PATH)
        # Clean headers: force lowercase and remove extra spaces
        df.columns = df.columns.str.strip().str.lower()
        print(f"✅ NEURAL SYNC COMPLETE: {len(df)} Nodes Active.")
        return df
    except Exception as e:
        print(f"❌ ERROR LOADING CSV: {e}")
        return pd.DataFrame()

# Load the data once at startup
master_db = load_master_data()

class ChatRequest(BaseModel):
    query: str

# --- 3. THE INTELLIGENCE LOGIC ---
@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    user_query = request.query.lower().strip()
    
    # Check every row in the 'question' column for a match
    for _, row in master_db.iterrows():
        keyword = str(row['question']).lower().strip()
        
        # Fuzzy Matching: If the keyword is anywhere in the user's sentence
        if keyword in user_query:
            # Member-1 sends the answer AND the type (text/pdf)
            response_type = str(row.get('type', 'text')).strip().lower()
            
            return {
                "response": str(row['answer']),
                "type": response_type,
                "status": "success"
            }

    # If no match is found
    return {
        "response": "I'm still learning that. Try asking for 'DBMS Unit 1' or 'HOD'.",
        "type": "text",
        "status": "not_found"
    }

# Search Bar endpoint (Redirects to chat logic)
@app.post("/api/search")
async def search_endpoint(request: ChatRequest):
    return await chat_endpoint(request)

if __name__ == "__main__":
    # Host 0.0.0.0 allows Abrar to connect from any device on the network
    uvicorn.run(app, host="0.0.0.0", port=8000)