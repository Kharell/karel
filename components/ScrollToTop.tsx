import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hitung progress scroll dalam persen
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Munculkan tombol jika scroll lebih dari 400px
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-28 right-7 z-[90] transition-all duration-500 transform ${
        showButton
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}>
      <button
        onClick={scrollToTop}
        className="relative group p-4 flex items-center justify-center transition-all duration-300 active:scale-90">
        {/* Lingkaran Progress (SVG) */}
        <svg className="absolute w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-white/10"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={176} // 2 * PI * R (28)
            strokeDashoffset={176 - (176 * scrollProgress) / 100}
            strokeLinecap="round"
            className="text-blue-500 transition-all duration-100 ease-out"
          />
        </svg>

        {/* Tombol Utama (Glassmorphism) */}
        <div className="relative w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:bg-blue-600/20 transition-all duration-300">
          {/* Icon Panah Animatif */}
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-400 group-hover:text-white transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 15l7-7 7 7"
              />
            </svg>
            {/* Titik Kecil di bawah panah */}
            <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:animate-ping"></div>
          </div>
        </div>

        {/* Tooltip saat di-hover */}
        <span className="absolute -left-20 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-tighter">
          Ke Atas
        </span>
      </button>
    </div>
  );
};

export default ScrollToTop;
