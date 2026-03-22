# AI-Based College Information Chatbot

## 📋 Project Overview

An intelligent AI-powered chatbot designed to provide students, faculty, and visitors with instant access to comprehensive college information. Built with a modern tech stack combining FastAPI (Python) backend with a Next.js frontend, featuring voice recognition, multi-language support (English/Urdu), and intelligent PDF document retrieval.

**Institution:** Gates Institute of Technology

---

## ✨ Key Features

- **Instant Information Retrieval** - Fast fuzzy-matching search across campus data
- **AI-Powered Responses** - Uses Groq's Llama 3.3 model for intelligent, context-aware answers
- **Multi-Turn Conversations** - Maintains conversation history for follow-up questions
- **Voice Recognition** - Speech-to-text input in English and Urdu
- **PDF Document Handling** - Retrieves and previews academic resources
- **Bilingual Support** - Toggle between English and Urdu interfaces
- **Beautiful Modern UI** - Sleek dark-themed interface with responsive design
- **Campus Directory Search** - Quick access to HOD info, gate details, and more
- **Admin Panel** - Secure admin access for content management
- **Real-time Status Indicators** - Visual feedback for processing, listening, and loading states

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
│  - React Components (TSX)                                   │
│  - Voice Input (Web Speech API)                             │
│  - PDF Previewer Component                                  │
│  - Multi-language Support                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (FastAPI - Python)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Main Server (main.py)                                │  │
│  │ - /api/chat - Chat endpoint                         │  │
│  │ - /api/search - Search endpoint                     │  │
│  │ - Fuzzy matching on CSV data                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Advanced AI (chatbot.py)                             │  │
│  │ - Groq Llama 3.3 Integration                        │  │
│  │ - ChromaDB Vector Store                             │  │
│  │ - Multi-turn Memory Management                      │  │
│  │ - RAG (Retrieval Augmented Generation)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Database Layer (database.py)                         │  │
│  │ - CSV Ingestion (gates_data.csv)                    │  │
│  │ - Lecture Notes Processing                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │    Data Sources              │
        │ - gates_data.csv             │
        │ - lecture_notes.csv          │
        │ - ChromaDB Vector Store      │
        │ - Groq API                   │
        └──────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.2.1
- **UI Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0
- **Icons:** Lucide React 0.577.0
- **3D Graphics:** Three.js 0.183.2, React Three Fiber
- **Markdown Rendering:** React Markdown 10.1.0

### Backend
- **Framework:** FastAPI
- **Server:** Uvicorn
- **Language:** Python 3.x
- **Data Processing:** Pandas
- **AI/ML:** LangChain, Groq API (Llama 3.3)
- **Vector Database:** ChromaDB
- **Environment:** Python-dotenv
- **Validation:** Pydantic

### Cross-Cutting
- **API:** REST with CORS enabled
- **Voice:** Web Speech API (Browser Native)
- **Communication:** JSON

---

## 📂 Project Structure

```
AI-Based-College-Information-Chatbot/
│
├── college-chatbot-backend/          # Python FastAPI Backend
│   ├── main.py                       # Main server & chat endpoint
│   ├── chatbot.py                    # AI logic with Groq + ChromaDB
│   ├── database.py                   # CSV ingestion & data processing
│   ├── requirements.txt               # Python dependencies
│   ├── .env                          # Environment variables (API keys)
│   ├── gates_data.csv                # Campus info database
│   ├── lecture_notes.csv             # Academic resources
│   ├── chroma_db/                    # Vector store directory
│   └── __pycache__/                  # Compiled Python files
│
├── pixel-chatbot-ui/                 # Next.js Frontend
│   ├── app/                          # App directory (Next.js 13+)
│   │   ├── page.tsx                  # Main chatbot interface
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── globals.css               # Global styles
│   │   ├── favicon.ico               # App icon
│   │   ├── components/               # Reusable React components
│   │   ├── admin/                    # Admin dashboard
│   │   └── login/                    # Authentication page
│   ├── public/                       # Static assets
│   ├── package.json                  # Node dependencies
│   ├── package-lock.json             # Dependency lock file
│   ├── tsconfig.json                 # TypeScript config
│   ├── next.config.ts                # Next.js config
│   ├── postcss.config.mjs            # PostCSS (TailwindCSS)
│   ├── eslint.config.mjs             # ESLint rules
│   ├── README.md                     # Frontend docs
│   └── AGENTS.md                     # AI agent specifications
│
├── .gitignore                        # Git ignore rules
└── README.md                         # This file

```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+ (for backend)
- Node.js 18+ (for frontend)
- Groq API Key ([Get one here](https://groq.com))
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd college-chatbot-backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables:**
   Create `.env` file:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Prepare data (optional):**
   ```bash
   python database.py
   ```
   This ingests CSVs and indexes them in ChromaDB.

6. **Start the server:**
   ```bash
   python main.py
   ```
   Server runs on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd pixel-chatbot-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open browser to `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📡 API Endpoints

### Chat Endpoint
**POST** `/api/chat`

Send a query to the chatbot.

**Request:**
```json
{
  "query": "Who is the HOD of Computer Science?"
}
```

**Response:**
```json
{
  "response": "Dr. John Smith is the HOD of Computer Science.",
  "type": "text",
  "status": "success"
}
```

### Search Endpoint
**POST** `/api/search`

Search the campus directory.

**Request:**
```json
{
  "query": "North Gate"
}
```

**Response:**
```json
{
  "response": "North Gate: Location near Main Academic Building, Open 6 AM - 10 PM",
  "type": "text",
  "status": "success"
}
```

### PDF Response Format
When type is "pdf", the content contains a Google Drive URL:
```json
{
  "response": "https://drive.google.com/file/d/ABC123/view",
  "type": "pdf",
  "status": "success"
}
```

---

## 🎯 Usage Guide

### For Students/Users

1. **Voice Input:**
   - Click the microphone button
   - Speak your question
   - The system transcribes and processes it

2. **Text Input:**
   - Type your question in the input box
   - Press Enter or click Send

3. **Language Toggle:**
   - Click the "English/Urdu" button to switch languages
   - Voice recognition adjusts automatically

4. **Search Directory:**
   - Use the search bar at the top
   - Search for staff, locations, courses, etc.

5. **PDF Documents:**
   - System automatically previews PDFs
   - Download or view in fullscreen

### Example Queries

- "Who is the Dean?"
- "Where is the North Gate?"
- "Tell me about DBMS Unit 1"
- "What are the college timings?"
- "Show me the campus map"

---

## 🔧 Configuration

### Backend Configuration (main.py)

```python
MASTER_PATH = r"D:\college chatbot ui\college-chatbot-backend\gates_data.csv"
# Change to your local path
```

### Frontend API URL (page.tsx)

```typescript
const response = await fetch("http://localhost:8000/api/chat", {
  // Change host:port if backend runs elsewhere
```

### ChromaDB Path (chatbot.py)

```python
db_path = "./chroma_db"
# Vector store location
```

---

## 📊 Data Format

### gates_data.csv
```csv
question,answer,type
Who is the Dean?,Dr. Ahmed Khan is our Dean.,text
North Gate?,North Gate: Open 6 AM - 10 PM,text
DBMS Unit 1,https://drive.google.com/file/d/ABC123/view,pdf
```

### lecture_notes.csv
```csv
subject,link,sem,year
Database Management Systems,https://drive.google.com/...,4,2
Data Structures,https://drive.google.com/...,2,1
```

---

## 🧠 AI & ML Features

### Retrieval Augmented Generation (RAG)
- Queries are embedded and matched against ChromaDB vector store
- Top 2 similar documents retrieved
- Provides context to Llama 3.3 model

### Multi-Turn Conversation
- Last 4 messages stored per user
- Enables follow-up questions
- Context-aware responses

### Temperature Setting
- Set to 0.1 for accuracy (deterministic outputs)
- Prevents hallucinations

---

## 🔐 Security Notes

⚠️ **Important:**
- Never commit API keys to GitHub
- Use `.env` files for secrets
- `chatbot.py` currently has hardcoded fallback key (REMOVE before production!)
- CORS is open (`allow_origins=["*"]`) - restrict in production

**Before Deployment:**
1. Move API keys to `.env`
2. Remove hardcoded keys
3. Restrict CORS origins
4. Enable authentication
5. Use HTTPS

---

## 🚨 Troubleshooting

### Backend Issues

| Problem | Solution |
|---------|----------|
| CSV file not found | Update MASTER_PATH in main.py |
| Groq API error | Check API key in .env |
| Port 8000 in use | `lsof -i :8000` (Linux/Mac) or change port |
| ChromaDB error | Delete chroma_db folder and restart |

### Frontend Issues

| Problem | Solution |
|---------|----------|
| Can't connect to backend | Ensure backend is running on localhost:8000 |
| Voice not working | Check browser permissions & supported browser |
| PDF not loading | Verify Google Drive URL format |
| Language not changing | Refresh page after toggle |

---

## 📈 Performance Metrics

- **Backend Response Time:** < 500ms (with Groq optimization)
- **Vector Search:** ~100ms (ChromaDB)
- **Frontend Load:** Optimized with Next.js
- **Voice Processing:** Real-time with Web Speech API

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 Development Notes

### Future Enhancements
- [ ] Database migration to PostgreSQL/MongoDB
- [ ] User authentication system
- [ ] Analytics dashboard
- [ ] Multi-file PDF handling
- [ ] SMS/WhatsApp integration
- [ ] Mobile app (React Native)
- [ ] Advanced NLP with fine-tuned models
- [ ] Real-time chatbot updates
- [ ] Integration with college management system

### Known Limitations
- Hardcoded CSV paths (needs environment-based)
- No user authentication
- Limited to CSV data sources
- CORS fully open (security risk)
- No rate limiting
- No persistent user sessions

---

## 📧 Contact

**Developer:** Abrar ul Haq  
**GitHub:** [@Abrarulhaq7865](https://github.com/Abrarulhaq7865)  
**Institution:** Gates Institute of Technology

---

## 📄 License

This project is open source. Check LICENSE file for details.

---

**Last Updated:** 2026-03-22 16:11:08  
**Version:** 1.0.0  
**Status:** Active Development
