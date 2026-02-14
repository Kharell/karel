import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white">
      {/* Animasi Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-24 h-24 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-r-2 border-l-2 border-slate-800 rounded-full animate-spin [animation-duration:3s]"></div>
      </div>

      {/* Teks Welcome */}
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent animate-pulse">
          Welcome to Portfolio
        </h1>
        <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">
          Karel Ganteng
        </p>
      </div>

      {/* Progress Bar Sederhana */}
      <div className="w-48 h-[2px] bg-slate-800 mt-8 overflow-hidden rounded-full">
        <div className="w-full h-full bg-green-500 origin-left animate-[loading_2.5s_ease-in-out_forwards]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
