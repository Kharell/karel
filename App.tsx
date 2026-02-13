import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import SectionTitle from "./components/SectionTitle";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import {
  PERSONAL_INFO,
  PROJECTS,
  EXPERIENCE,
  EDUCATION,
  SKILLS,
} from "./constants";
import { Project } from "./types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SKILLS[0].title);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && glowRef.current) {
        const { clientX, clientY } = e;
        cursorRef.current.style.left = `${clientX - 10}px`;
        cursorRef.current.style.top = `${clientY - 10}px`;
        glowRef.current.style.left = `${clientX}px`;
        glowRef.current.style.top = `${clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const closeProject = () => setSelectedProject(null);

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Custom Colorful Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block"></div>
      <div ref={glowRef} className="custom-cursor-glow hidden md:block"></div>

      <Navbar />

      {/* AI Chatbot */}
      <Chatbot />
      <ScrollToTop />

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
          onClick={closeProject}>
          <div
            className="glass max-w-2xl w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6 sm:p-12 relative">
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-lg inline-block mb-6">
                {selectedProject.role}
              </span>

              <h3 className="text-2xl sm:text-4xl font-bold mb-6 tracking-tight text-white leading-tight">
                {selectedProject.title}
              </h3>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-6 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 text-blue-300 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-transparent">
                  <button
                    onClick={closeProject}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                    Tutup Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* SISI KANAN: VIP CARD PREMIUM */}
          <div className="order-1 md:order-2 relative group">
            {/* Badge VIP Melayang */}
            <div className="absolute -top-6 -right-6 z-30 bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-700 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-slate-900 group-hover:scale-110 transition-transform duration-500 animate-bounce-slow">
              <span className="text-slate-900 font-black text-xl tracking-tighter">
                VIP
              </span>
            </div>

            {/* CARD CONTAINER */}
            <div className="relative animate-fade-in-up">
              <div className="w-72 h-[460px] bg-gradient-to-b from-slate-800/90 to-slate-950 rounded-[2.5rem] p-6 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:border-yellow-500/50 group-hover:shadow-yellow-500/10 overflow-hidden backdrop-blur-md">
                {/* Efek Kilau (Shine) */}
                <div className="absolute -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />

                {/* Logo / Brand Kartu */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    Premium Identity
                  </span>
                </div>

                {/* Area Foto Profile - UKURAN PAS KOTAK */}
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-900 relative mb-6 border border-white/5 shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${PERSONAL_INFO.avatar || "/fp.jpg"})`,
                      backgroundPosition: "center 20%", // Mengatur agar wajah tetap di tengah meski di-zoom
                    }}></div>

                  {/* Overlay Gradient Elegan di bagian bawah foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                </div>

                {/* Informasi VIP */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-white font-bold text-xl tracking-tight leading-tight">
                      Pangeran Karel Ganteng
                    </h2>
                    <p className="text-yellow-500/80 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                      S1 Teknik Informatika
                    </p>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                        Access Level
                      </p>
                      <p className="text-sm text-slate-200 font-semibold">
                        Junior Web Developer
                      </p>
                    </div>

                    {/* Gold Chip Icon */}
                    <div className="w-10 h-7 rounded bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 p-[1px]">
                      <div className="w-full h-full bg-slate-900/20 rounded-[3px] flex flex-col justify-around p-1 shadow-inner">
                        <div className="h-[0.5px] w-full bg-yellow-200/40"></div>
                        <div className="h-[0.5px] w-full bg-yellow-200/40"></div>
                        <div className="h-[0.5px] w-full bg-yellow-200/40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SISI KIRI: Konten Teks */}
          <div className="order-2 md:order-1 flex-1 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight text-white">
              Junior<span className="text-gradient"> Web Dev.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 font-medium mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Selamat datang. Saya{" "}
              <span className="text-white font-semibold">Pangeran Karel</span>,
              seorang Junior Web Developer yang menggabungkan presisi teknis
              dengan estetika desain kelas atas.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all shadow-xl active:scale-95">
                Hire Karel
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shine {
            0% {
              left: -100%;
            }
            100% {
              left: 125%;
            }
          }
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-shine {
            animation: shine 1.2s ease-in-out;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
        `}</style>
      </header>

      {/* About Section - ENHANCED */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Tentang Pangeran Karel"
            subtitle="Eksplorasi perjalanan kreativitas dan teknologi saya."
          />

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Akademik", value: "3.41 IPK", color: "blue" },
              { label: "Kelulusan", value: "3.5 Tahun", color: "purple" },
              { label: "Semester", value: "7 Selesai", color: "indigo" },
              { label: "Status", value: "Fresh Grad 2025", color: "green" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass p-6 rounded-3xl text-center border-white/5 hover:border-blue-500/30 transition-all group">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 group-hover:text-blue-400 transition-colors">
                  {stat.label}
                </p>
                <p className="text-xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Story Card */}
            <div className="lg:col-span-3 space-y-6">
              <div className="glass p-8 sm:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>

                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                    01
                  </span>
                  The Vision
                </h3>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                  Sebagai lulusan{" "}
                  <span className="text-white font-semibold">
                    Teknik Informatika
                  </span>{" "}
                  yang bersemangat, saya tidak hanya sekadar menulis kode, tapi
                  membangun solusi. Fokus saya adalah pada ekosistem{" "}
                  <span className="text-blue-400 font-bold">MERN Stack</span>{" "}
                  dan pengembangan mobile.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      Pilar Belajar
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Full Stack JS (CodePolitan)",
                        "MERN Stack (BuildWithAngga)",
                        "Autodidact YouTube & Docs",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-400">
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                      Sisi Kreatif
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "UI/UX Design Figma",
                        "Logo & Branding Designer",
                        "Clothing Line Streatwear",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-400">
                          <svg
                            className="w-4 h-4 text-purple-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dynamic Highlights */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-[2rem] border-white/5 hover:bg-blue-600/5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-2">Team Leader</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Aktif berorganisasi dan memimpin pembelajaran teknologi di
                    Study Club KMK.
                  </p>
                </div>
                <div className="glass p-6 rounded-[2rem] border-white/5 hover:bg-purple-600/5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-white mb-2">Fast Learner</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Menyelesaikan gelar S1 hanya dalam 3.5 tahun dengan
                    penguasaan teknologi modern.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Info Side Card */}
            <div className="lg:col-span-2 sticky top-28 space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border-blue-500/20 shadow-xl shadow-blue-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Jejak Pendidikan
                </h4>

                <div className="space-y-8">
                  <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                      {EDUCATION.period}
                    </p>
                    <h5 className="font-bold text-white text-lg leading-tight mb-2">
                      {EDUCATION.university}
                    </h5>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {EDUCATION.degree}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase">
                          Gelar
                        </p>
                        <p className="text-sm font-bold text-white">
                          S.Kom (Cand.)
                        </p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase">
                          IPK
                        </p>
                        <p className="text-sm font-bold text-blue-400">
                          {EDUCATION.ipk}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-5 rounded-3xl bg-blue-600/5 border border-blue-500/10">
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Pendidikan adalah senjata paling ampuh yang bisa digunakan
                    untuk mengubah dunia. Saya siap berkontribusi."
                  </p>
                </div>
              </div>

              {/* Contact Card Mini */}
              <div className="glass p-1 rounded-[2rem] border-white/5 overflow-hidden group">
                <a
                  href="https://drive.google.com/file/d/1iEuXyQx6IdGcGGuGURV_lJentyg771wd/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-[1.8rem] bg-slate-900/40 hover:bg-blue-600/5 transition-all duration-500 group/link">
                  {/* Icon Area - Dual Icon (Email + Drive) */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover/link:scale-110 group-hover/link:border-blue-500/50 transition-all duration-500 shadow-lg shadow-blue-500/10">
                      {/* Icon Google Drive */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M9 12h6" />
                        <path d="M12 9v6" />
                        <path d="M15 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                        <path d="M12 18v-1" />
                      </svg>
                    </div>

                    {/* Mini Icon Drive Overlay */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg border-2 border-[#0f172a] flex items-center justify-center shadow-lg">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="white">
                        <path d="M7.74 2L12 9.4L16.26 2H7.74ZM1.43 13L5.69 20.4H14.21L9.95 13H1.43ZM15.79 13L20.05 20.4H22.57L18.31 13H15.79Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Text Area */}
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-0.5">
                      Butuh CV Lengkap?
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-white font-bold group-hover/link:text-blue-400 transition-colors">
                        Lihat di Google Drive
                      </p>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 group-hover/link:text-blue-400 group-hover/link:bg-blue-400/10 group-hover/link:translate-x-1 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                TECH{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  STACK
                </span>
              </h2>
              <p className="text-slate-400 max-w-md font-medium">
                Kumpulan senjata digital yang saya gunakan untuk membangun
                solusi masa depan.
              </p>
            </div>

            {/* Tab Selector Modern */}
            <div className="flex bg-slate-800/50 p-1.5 rounded-2xl backdrop-blur-md border border-white/5 overflow-x-auto no-scrollbar max-w-full">
              {SKILLS.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveTab(cat.title)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-500 whitespace-nowrap ${
                    activeTab === cat.title
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-100"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}>
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS.find((c) => c.title === activeTab)?.skills.map(
              (skill, idx) => (
                <div
                  key={skill}
                  className="group relative"
                  style={{ animationDelay: `${idx * 50}ms` }}>
                  {/* Card Style */}
                  <div className="relative h-full glass p-6 rounded-[2rem] border-white/5 bg-slate-900/40 overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/50 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                    {/* Background Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon Loader - Menggunakan Simple Icons CDN */}
                    <div className="relative w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                      <div className="absolute inset-0 bg-slate-800 rounded-2xl border border-white/5 shadow-inner"></div>

                      {/* Dynamic Icon Image */}
                      <img
                        src={`https://cdn.simpleicons.org/${skill.replace(/\s+/g, "").toLowerCase()}`}
                        alt={skill}
                        className="w-8 h-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                        onError={(e) => {
                          // Fallback jika icon tidak ditemukan di CDN
                          (e.target as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${skill}&background=0D1117&color=3b82f6&bold=true`;
                        }}
                      />
                    </div>

                    {/* Label */}
                    <div className="relative text-center">
                      <p className="text-[13px] sm:text-sm font-black tracking-tight text-slate-300 group-hover:text-white transition-colors">
                        {skill}
                      </p>

                      {/* Progress Indicator (Mini) */}
                      <div className="mt-3 h-1 w-12 mx-auto bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Proyek Pilihan"
            subtitle="Klik kartu untuk melihat detail selengkapnya."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProject(project)}
                className="group relative glass rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border border-slate-800/50 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

                <div className="p-6 sm:p-10 relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-lg shadow-sm">
                      {project.role}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 group-hover:text-white transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 group-hover:border-blue-500/30 transition-all">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/30">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-16 md:py-24 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Pengalaman Kerja & Organisasi" align="center" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative pl-10 md:pl-0">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-800"></div>

                <div
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1 w-full glass p-6 sm:p-8 rounded-3xl hover:bg-slate-900 transition-colors border-slate-800 hover:border-blue-500/30">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-400">
                        {exp.title}
                      </h3>
                      <span className="text-[11px] sm:text-sm font-medium text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="font-semibold text-white mb-4 text-sm sm:text-base">
                      {exp.company}
                    </p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-slate-400 text-xs sm:text-sm flex gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute md:relative left-0 md:left-auto w-8 h-8 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto glass p-8 md:p-16 rounded-[2rem] sm:rounded-[3rem] text-center overflow-hidden relative border border-slate-800 shadow-2xl">
          {/* Background Glows */}
          <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Mari Berkolaborasi
          </h2>
          <p className="text-slate-400 mb-10 sm:mb-12 max-w-xl mx-auto text-base sm:text-lg">
            Tertarik untuk merekrut saya atau sekadar berdiskusi tentang proyek?
            Klik salah satu kartu di bawah ini untuk terhubung secara instan.
          </p>

          {/* Grid Kontak - 4 Kolom di Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {/* Email - Direct Message */}
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Halo Pangeran Karel!`}
              className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-blue-500/40 shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20 group-hover:rotate-6 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">
                Email Me
              </p>
              <p className="font-bold text-xs truncate text-slate-200">
                {PERSONAL_INFO.email}
              </p>
            </a>

            {/* WhatsApp - Direct Chat */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, "")}?text=Halo%20Karel,%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-green-500/40 shadow-sm">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 group-hover:-rotate-6 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.661 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">
                WhatsApp
              </p>
              <p className="font-bold text-xs text-slate-200">Chat Instan</p>
            </a>

            {/* GitHub - New Card */}
            <a
              href="https://github.com/Kharell"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-white/40 shadow-sm">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:rotate-12 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">
                GitHub
              </p>
              <p className="font-bold text-xs text-slate-200">
                Kharell Repository
              </p>
            </a>

            {/* LinkedIn - Profile */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-indigo-500/40 shadow-sm">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">
                LinkedIn
              </p>
              <p className="font-bold text-xs text-slate-200">Karell Kalang</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-slate-500 text-[11px] sm:text-sm">
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">
              React
            </span>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">
              TypeScript
            </span>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">
              Vite
            </span>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">
              Tailwind CSS
            </span>
          </div>
        </div>
      </footer>

      {/* Styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
