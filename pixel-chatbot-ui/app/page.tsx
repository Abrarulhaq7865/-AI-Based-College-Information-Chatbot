"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Send, Mic, Globe, ShieldCheck, 
  Search, Bot, User, Activity, ArrowRight,
  FileText, Download, ExternalLink
} from "lucide-react";

// --- 1. NEW COMPONENT: PDF PREVIEWER ---
const PdfPreviewer = ({ url }: { url: string }) => {
  const previewUrl = url.includes('/preview') ? url : url.replace('/view', '/preview');
  // Formats link for direct download
  const downloadUrl = url.replace('/preview', '').replace('/view', '').replace('/file/d/', '/uc?export=download&id=');

  return (
    <div className="w-full mt-4 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#0a0a0f]">
      <div className="bg-zinc-900/80 px-4 py-2 text-white text-[10px] font-bold flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-blue-400" />
          <span className="tracking-widest uppercase">Academic Vault Preview</span>
        </div>
        <div className="flex gap-3">
          <a href={downloadUrl} target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <Download size={12} /> Download
          </a>
          <a href={url.replace('/preview', '/view')} target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <ExternalLink size={12} /> Full Screen
          </a>
        </div>
      </div>
      <iframe
        src={previewUrl}
        width="100%"
        height="350px"
        allow="autoplay"
        className="border-none opacity-90 hover:opacity-100 transition-opacity"
        title="PDF Preview"
      />
    </div>
  );
};

export default function AlexaStyleInterface() {
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- UPDATED MESSAGE STATE TO HANDLE TYPES ---
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello Abrar. I am the Gates AI Assistant. You can ask me questions or use the search bar above to browse the campus directory.", type: "text" }
  ]);

  const toggleLanguage = () => {
    setLanguage(language === "English" ? "Urdu" : "English");
  };

  // --- UPDATED CHAT LOGIC: NOW HANDLES RESPONSE TYPES ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    
    setMessages(prev => [...prev, { role: "user", content: userMessage, type: "text" }]);
    setInput("");
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error("Backend connection failed");
      
      const data = await response.json();
      
      // Member 1 now sends { response: "...", type: "pdf" | "text" }
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: data.response || "Message processed.", 
        type: data.type || "text" 
      }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: `⚠️ Backend Offline. (Demo Mode): I received your message about "${userMessage}".`, 
        type: "text" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- UPDATED SEARCH LOGIC ---
  const handleSearch = async () => {
    if (!searchQuery.trim() || isLoading) return;
    const query = searchQuery;

    setMessages(prev => [...prev, { role: "user", content: `Search Directory: "${query}"`, type: "text" }]);
    setSearchQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: data.response || "Search complete.", 
        type: data.type || "text" 
      }]);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: `⚠️ Backend Offline.`, type: "text" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- VOICE LOGIC ---
  const startListening = (targetInput: "chat" | "search") => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "English" ? 'en-US' : 'ur-PK';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (targetInput === "chat") setInput(transcript);
      else setSearchQuery(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <main className="flex h-screen flex-col items-center justify-between bg-[#030305] text-white font-sans relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      </div>

      {/* HEADER & SEARCH */}
      <header className="relative w-full max-w-6xl flex items-center justify-between p-6 z-50 gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-white/10">G</div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black tracking-tight uppercase text-zinc-100">Gates AI</h1>
            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em]">Assistant Core</p>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-auto hidden md:block">
           <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-black/50 border border-white/10 backdrop-blur-md rounded-full pl-4 pr-1 py-1.5">
                 <Search size={16} className="text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                 <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search campus directory..."
                    className="w-full bg-transparent border-none outline-none px-3 text-xs font-medium text-white placeholder:text-zinc-600 relative z-50 py-2"
                 />
                 <div className="flex items-center gap-1 relative z-50">
                   <button onClick={() => startListening("search")} className={`p-2 rounded-full ${isListening ? "text-red-500 animate-pulse" : "text-zinc-400"}`}>
                      <Mic size={14} />
                   </button>
                   <button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()} className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-all">
                      <ArrowRight size={14} />
                   </button>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/login">
            <button className="flex items-center gap-2 bg-black/40 border border-white/5 px-4 py-2.5 rounded-full transition-all backdrop-blur-md hover:bg-white/5">
              <ShieldCheck size={14} className="text-red-400" />
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest hidden lg:block">Admin</span>
            </button>
          </Link>
          <button onClick={toggleLanguage} className="flex items-center gap-2 bg-black/40 border border-white/5 px-4 py-2.5 rounded-full backdrop-blur-md">
            <Globe size={14} className="text-emerald-400" />
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{language}</span>
          </button>
        </div>
      </header>

      {/* AVATAR & CHAT AREA */}
      <div className="relative flex-1 w-full max-w-4xl flex flex-col items-center justify-center p-6 z-20">
        
        {/* AVATAR CORE */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-8">
           <div className={`absolute inset-0 rounded-full blur-[60px] duration-700 ${isLoading ? "bg-cyan-500/40 animate-pulse" : isListening ? "bg-red-500/30 animate-ping" : "bg-blue-600/20 animate-pulse"}`}></div>
           <div className={`absolute inset-2 rounded-full opacity-80 ${isLoading ? "bg-[conic-gradient(from_0deg,transparent,theme(colors.cyan.400),theme(colors.blue.600),transparent)] animate-[spin_0.5s_linear_infinite]" : isListening ? "bg-[conic-gradient(from_0deg,transparent,theme(colors.red.500),theme(colors.orange.500),transparent)] animate-[spin_1s_linear_infinite]" : "bg-[conic-gradient(from_0deg,transparent,theme(colors.blue.500),theme(colors.purple.500),transparent)] animate-[spin_3s_linear_infinite]"}`}></div>
           <div className="absolute inset-4 bg-[#050508] rounded-full flex items-center justify-center z-10 border border-blue-500/20">
              <div className="relative flex flex-col items-center">
                 <Bot size={56} className={`${isLoading ? "text-cyan-300 animate-pulse" : isListening ? "text-red-400" : "text-blue-400 animate-bounce"}`} />
              </div>
           </div>
        </div>

        {/* --- UPDATED RENDER/MAPPING LOGIC --- */}
        <div className="w-full bg-black/50 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-6 lg:p-8 min-h-[300px] max-h-[450px] shadow-2xl flex flex-col overflow-y-auto scrollbar-hide">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <Activity size={32} className="text-blue-500 mb-4 animate-pulse" />
              <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase">Awaiting Input...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 w-full">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                  <div className={`max-w-[85%] p-5 rounded-3xl border ${
                    msg.role === "bot" 
                      ? "bg-white/5 border-white/10 text-white rounded-tl-none shadow-lg" 
                      : "bg-gradient-to-br from-blue-600 to-indigo-700 border-white/20 text-white rounded-tr-none shadow-lg"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-60">
                      {msg.role === "bot" ? <Bot size={12} /> : <User size={12} />}
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{msg.role === "bot" ? "AI_Assistant" : "You"}</span>
                    </div>

                    {/* Check if message is a standard response or PDF resource */}
                    <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    
                    {/* ONLY RENDER PREVIEW IF TYPE IS PDF */}
                    {msg.role === "bot" && msg.type === "pdf" && (
                      <PdfPreviewer url={msg.content} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-in fade-in duration-500">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-3">
                    <Activity size={14} className="text-cyan-400 animate-spin" />
                    <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase animate-pulse">Processing...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM INPUT COMMAND */}
      <div className="relative w-full max-w-4xl p-6 z-50 pb-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-50 transition duration-700"></div>
          <div className="relative flex items-center bg-[#07070a]/90 border border-white/10 backdrop-blur-xl rounded-[2rem] p-2 shadow-2xl">
            <button onClick={() => startListening("chat")} disabled={isLoading} className={`p-4 rounded-full transition-all ${isListening ? "text-red-500 bg-red-500/10 animate-pulse" : "text-zinc-400"}`}>
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
              placeholder={isLoading ? "Processing directive..." : isListening ? "Listening..." : "Ask about DBMS Unit 1..."}
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium text-white placeholder:text-zinc-600"
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className={`relative px-8 py-3.5 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-full transition-all ${isLoading ? "bg-zinc-700" : "bg-blue-600 hover:bg-blue-500"}`}>
              {isLoading ? "WAIT" : "Send"} {isLoading ? <Activity size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}