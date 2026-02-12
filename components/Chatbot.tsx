import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
} from "../constants";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([
    {
      role: "model",
      text: "Halo! Saya asisten dari pangeran Karolus Jone Kalang (Karel Kalang) ganteng. Ada yang bisa saya bantu terkait portofolio beliau?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Mencegah scroll pada body saat chat terbuka di mobile
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

      const systemInstruction = `
        Anda adalah asisten virtual cerdas untuk website portofolio Karolus Jone Kalang.
        Identitas Anda: Anda adalah asisten dari "pangeran karel kalang ganteng".
        Tugas Anda adalah memberikan informasi akurat dan ramah tentang Karel kepada pengunjung.
        
        Informasi Karel:
        - Nama Lengkap: ${PERSONAL_INFO.name} (Panggilan: ${PERSONAL_INFO.nickname})
        - Role: ${PERSONAL_INFO.title}
        - Ringkasan: ${PERSONAL_INFO.summary}
        - Pendidikan: ${EDUCATION.degree} di ${EDUCATION.university}, IPK ${EDUCATION.ipk}, lulus dalam ${EDUCATION.duration}.
        - Kemampuan Utama: ${SKILLS.map((s) => `${s.title}: ${s.skills.join(", ")}`).join("; ")}
        - Pengalaman: ${EXPERIENCE.map((e) => `${e.title} di ${e.company} (${e.duration})`).join("; ")}
        - Proyek: ${PROJECTS.map((p) => p.title).join(", ")}
        
        Aturan:
        1. Jawab dalam Bahasa Indonesia yang santai namun tetap menghormati Karel sebagai "Pangeran Karel".
        2. Gunakan Bahasa Gaul Makassar sesekali jika relevan (ji, ki, mi).
        3. Jika ditanya hal di luar Karel, arahkan kembali untuk bertanya tentang karir atau pangeran Karel.
        4. Selalu sebut beliau dengan penuh hormat dan sesekali sebut "pangeran karel ganteng" jika diminta identitas.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages
          .map((m) => ({ role: m.role, parts: [{ text: m.text }] }))
          .concat([{ role: "user", parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const aiText =
        response.text ||
        "Maaf, asisten pangeran sedang mengalami kendala teknis. Coba lagi nanti ya.";
      setMessages((prev) => [...prev, { role: "model", text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Aduh, sepertinya asisten pangeran lagi 'loding'. Coba tanya langsung ke WA pangeran karel ganteng saja dulu!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-[100] transition-all duration-500 ease-in-out ${
        isOpen
          ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6" // Di mobile jadi Full Screen
          : "bottom-6 right-6"
      }`}>
      {/* Chat Window Container */}
      {isOpen && (
        <div className="flex flex-col w-full h-full sm:w-[420px] sm:h-[650px] sm:max-h-[85vh] sm:rounded-[2.5rem] bg-slate-900/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
          {/* Header - Sticky di atas */}
          <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 backdrop-blur-xl border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="text-white font-black text-xs sm:text-sm tracking-tighter">
                    KK
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  Asisten Pangeran{" "}
                  <span className="hidden sm:inline text-[10px] py-0.5 px-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 font-medium">
                    AI
                  </span>
                </h3>
                <p className="text-[9px] sm:text-[11px] text-blue-300/80 font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] animate-pulse">
                  Online Sekarang
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all active:scale-90 border border-white/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Area Pesan - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 bg-slate-950/40 custom-scrollbar overscroll-contain">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                {/* Avatar Icon */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === "user" ? (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-[18px] sm:h-[18px]">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="10" r="3" />
                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-[18px] sm:h-[18px]">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bubble Chat - Responsive Width */}
                <div
                  className={`relative max-w-[80%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-[1.4rem] sm:rounded-[1.8rem] text-[13px] sm:text-sm leading-relaxed shadow-xl border ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none border-blue-400/30"
                      : "bg-slate-800/80 backdrop-blur-md text-slate-200 rounded-tl-none border-white/10"
                  }`}>
                  {msg.text}

                  <div
                    className={`flex items-center mt-1.5 opacity-40 text-[8px] sm:text-[10px] ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <span>
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.role === "user" && (
                      <div className="flex ml-1 text-blue-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="sm:w-3 sm:h-3">
                          <path d="M18 6 7 17l-5-5" />
                          <path d="m22 10-7.5 7.5L13 16" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed di bawah */}
          <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-white/10 backdrop-blur-xl shrink-0">
            <div className="relative flex items-center gap-2 group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tulis pesan..."
                className="flex-1 bg-slate-950/50 border border-white/10 rounded-2xl pl-4 pr-12 py-3.5 sm:py-4 text-[13px] sm:text-sm text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 sm:right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 disabled:from-slate-800 text-white rounded-xl flex items-center justify-center transition-all active:scale-90">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 sm:w-6 sm:h-6 rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button - Responsif Size */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2.2rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 sm:w-10 sm:h-10 transition-transform group-hover:rotate-12 duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="absolute top-3 right-3 sm:top-5 sm:right-5 w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full border-2 border-slate-900 shadow-lg">
            <span className="absolute inset-0 bg-white rounded-full animate-ping"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
