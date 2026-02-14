import React, { useState, useEffect } from "react";

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Timer mengikuti alur persiapan data
    const fadeTimer = setTimeout(() => setIsVisible(false), 2500);
    const removeTimer = setTimeout(() => setShouldRender(false), 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      {/* Background Decor - Sama dengan Hero Section kamu */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative flex flex-col items-center p-8">
        {/* VIP Style Icon Container */}
        <div className="relative mb-10">
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>

          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer Rotating Ring (Slate & Blue) */}
            <div className="absolute inset-0 border-t-2 border-l-2 border-blue-500 rounded-[2rem] animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-2 border-b-2 border-r-2 border-slate-700 rounded-[1.5rem] animate-[spin_2s_linear_infinite_reverse]"></div>

            {/* Center Logo - Inisial K dari Karel */}
            <div className="glass w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
              <span className="text-white text-3xl font-black tracking-tighter italic">
                KK
              </span>
            </div>
          </div>

          {/* VIP Badge Mini */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-700 px-2 py-0.5 rounded-md shadow-lg transform rotate-12">
            <span className="text-[8px] font-black text-slate-900">VIP</span>
          </div>
        </div>

        {/* Text Section - Tipografi mengikuti App.tsx */}
        <div className="text-center space-y-2">
          <h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em] animate-pulse">
            System Initializing
          </h2>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-2">
            Karel
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Ganteng.
            </span>
          </h1>

          <p className="text-slate-500 text-xs font-medium tracking-widest uppercase italic pt-1">
            "High-End Digital Solutions"
          </p>
        </div>

        {/* Premium Progress Bar */}
        <div className="mt-12 relative">
          <div className="w-56 h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
            {/* Inner Loading Fill */}
            <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 w-full origin-left animate-[loading-bar_2.5s_ease-in-out_forwards]"></div>
          </div>

          {/* Shimmer Effect on Bar */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
        </div>
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
