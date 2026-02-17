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
      // tanbahjab nanti api key nya 2 lagi agar bisa lama di gunakan promting saat chat
      // const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      // const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

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
    <div className="fixed bottom-6 right-6 z-[100] font-sans antialiased">
      {/* Chat Window Container */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[92vw] sm:w-[440px] h-[75vh] sm:h-[680px] max-h-[700px] flex flex-col bg-slate-900/90 backdrop-blur-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] rounded-[3rem] overflow-hidden origin-bottom-right animate-in fade-in zoom-in slide-in-from-bottom-12 duration-500 ease-out">
          {/* Header */}
          <div className="relative flex items-center justify-between p-5 sm:p-6 bg-white/5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 flex items-center justify-center border border-white/30 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <span className="text-white font-black text-sm tracking-widest">
                    KK
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-slate-900 rounded-full shadow-lg"></div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Asisten Pangeran
                </h3>
                <p className="text-[10px] text-blue-300/80 font-bold uppercase tracking-[0.2em] mt-1">
                  Online Sekarang
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all border border-white/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Area Pesan */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar overscroll-contain">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                {/* Avatar: User Icon vs AI "K" Logo */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg border ${
                    msg.role === "user"
                      ? "bg-blue-600/20 border-blue-400/30 text-blue-400"
                      : "bg-indigo-600/20 border-indigo-400/30 text-indigo-400"
                  }`}>
                  {msg.role === "user" ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ) : (
                    <span className="font-black text-lg italic">K</span>
                  )}
                </div>

                <div
                  className={`relative max-w-[82%] p-4 rounded-[1.7rem] text-[13.5px] leading-[1.6] shadow-xl border ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-tr-none border-blue-400/40"
                      : "bg-white/10 backdrop-blur-lg text-slate-100 rounded-tl-none border-white/10"
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Indikator Memutar saat Menunggu Balasan AI */}
            {isLoading && (
              <div className="flex gap-3.5 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <span className="font-black text-lg italic">K</span>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-4 rounded-[1.7rem] rounded-tl-none border border-white/10 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-[11px] text-indigo-300 font-medium italic ml-1">
                    Berpikir...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-white/10 shrink-0">
            <div className="relative flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tulis pesan..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-blue-500/40 outline-none transition-all placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 hover:scale-105 active:scale-95 disabled:opacity-40 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg">
                {isLoading ? (
                  <svg
                    className="w-6 h-6 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 rotate-45"
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

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-20 h-20 rounded-[2.2rem] flex items-center justify-center shadow-2xl transition-all duration-700 hover:scale-110 active:scale-95 group overflow-hidden ${
          isOpen
            ? "bg-slate-800 rotate-180"
            : "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-800 text-white"
        }`}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 transition-all group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-900 shadow-xl group-hover:scale-125 transition-transform duration-500">
              <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
}; 

export default Chatbot;