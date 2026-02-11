
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, SKILLS } from '../constants';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Halo! Saya asisten dari pangeran Karolus Jone Kalang (Karel Kalang) ganteng. Ada yang bisa saya bantu terkait portofolio beliau?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Mencegah scroll pada body saat chat terbuka di mobile
      if (window.innerWidth < 640) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        Anda adalah asisten virtual cerdas untuk website portofolio Karolus Jone Kalang.
        Identitas Anda: Anda adalah asisten dari "pangeran karel kalang ganteng".
        Tugas Anda adalah memberikan informasi akurat dan ramah tentang Karel kepada pengunjung.
        
        Informasi Karel:
        - Nama Lengkap: ${PERSONAL_INFO.name} (Panggilan: ${PERSONAL_INFO.nickname})
        - Role: ${PERSONAL_INFO.title}
        - Ringkasan: ${PERSONAL_INFO.summary}
        - Pendidikan: ${EDUCATION.degree} di ${EDUCATION.university}, IPK ${EDUCATION.ipk}, lulus dalam ${EDUCATION.duration}.
        - Kemampuan Utama: ${SKILLS.map(s => `${s.title}: ${s.skills.join(', ')}`).join('; ')}
        - Pengalaman: ${EXPERIENCE.map(e => `${e.title} di ${e.company} (${e.duration})`).join('; ')}
        - Proyek: ${PROJECTS.map(p => p.title).join(', ')}
        
        Aturan:
        1. Jawab dalam Bahasa Indonesia yang santai namun tetap menghormati Karel sebagai "Pangeran Karel".
        2. Gunakan Bahasa Gaul Makassar sesekali jika relevan (ji, ki, mi).
        3. Jika ditanya hal di luar Karel, arahkan kembali untuk bertanya tentang karir atau pangeran Karel.
        4. Selalu sebut beliau dengan penuh hormat dan sesekali sebut "pangeran karel ganteng" jika diminta identitas.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })).concat([{ role: 'user', parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const aiText = response.text || "Maaf, asisten pangeran sedang mengalami kendala teknis. Coba lagi nanti ya.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Aduh, sepertinya asisten pangeran lagi 'loding'. Coba tanya langsung ke WA pangeran karel ganteng saja dulu!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed z-[100] transition-all duration-300 ease-in-out ${
      isOpen 
        ? 'inset-0 sm:inset-auto sm:bottom-6 sm:right-6' 
        : 'bottom-6 right-6'
    }`}>
      {/* Chat Window Container */}
      {isOpen && (
        <div className="flex flex-col w-full h-full sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] sm:rounded-[2rem] glass border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/10">
                <span className="text-white font-black text-xs sm:text-sm">KK</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">Asisten Pangeran</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide uppercase">Tersedia Sekarang</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 sm:p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
              aria-label="Tutup Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/20 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`group relative max-w-[88%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none font-medium' 
                    : 'glass text-slate-200 rounded-bl-none border-white/5 backdrop-blur-sm'
                }`}>
                  {msg.text}
                  {/* Bubble Tail Replacement - Pure CSS approach or omitted for cleaner look */}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="glass p-4 rounded-2xl rounded-bl-none border-white/5 flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-6 bg-slate-950/40 border-t border-white/5 backdrop-blur-xl">
            <div className="relative flex items-center gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan sesuatu..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-5 pr-14 py-3 sm:py-4 text-[13px] sm:text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none placeholder:text-slate-500 transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-blue-500/20"
                aria-label="Kirim Pesan"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isLoading ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  )}
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 sm:mt-4 px-1">
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider">Powered by Gemini AI</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider">Pangeran Karel Kalang</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:shadow-blue-500/40"
          aria-label="Buka Chatbot"
        >
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-blue-400/20 scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          
          {/* Notification Badge */}
          <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 sm:w-5 sm:h-5 bg-blue-400 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
