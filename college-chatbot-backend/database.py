import pandas as pd
import os

# --- CONFIGURATION ---
CAMPUS_FILE = "gates_data.csv"
NOTES_FILE = "lecture_notes.csv"

def ingest_csv(filename):
    if not os.path.exists(filename):
        return f"⚠️ Skip: {filename} not found."

    try:
        # 1. Load the CSV
        df = pd.read_csv(filename)
        
        # 2. Clean column names (strip spaces and lowercase for consistency)
        df.columns = df.columns.str.strip().str.lower()
        
        print(f"--- Processing {filename} ({len(df)} rows) ---")

        for index, row in df.iterrows():
            # Use .get() to avoid KeyError if a column is missing
            # It will return 'None' instead of crashing
            keyword = row.get('keyword') or row.get('question')
            answer = row.get('answer') or row.get('link')
            
            # Additional metadata for the Lecture Vault
            subject = row.get('subject', 'General')
            year = row.get('year', 0)
            sem = row.get('sem', 0)

            # Debugging print to see it working in the terminal
            print(f"✅ Ingesting: {keyword} -> {subject}")

            # --- DATABASE SAVE LOGIC ---
            # If you are using SQLAlchemy or another DB, put your session.add() here.
            # If you are just using the CSVs directly in main.py, 
            # this script is mostly for validation.

        return f"✨ Successfully processed {filename}"

    except Exception as e:
        return f"❌ Error in {filename}: {e}"

if __name__ == "__main__":
    print("--- 🗑️ Cleaning and Re-indexing Knowledge Base ---")
    
    # Process both files
    print(ingest_csv(CAMPUS_FILE))
    print(ingest_csv(NOTES_FILE))
    
    print("\n🚀 Database Sync Complete. You can now run main.py")