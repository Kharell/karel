
import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import SectionTitle from './components/SectionTitle';
import Chatbot from './components/Chatbot';
import { 
  PERSONAL_INFO, 
  PROJECTS, 
  EXPERIENCE, 
  EDUCATION, 
  SKILLS 
} from './constants';
import { Project } from './types';

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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
          onClick={closeProject}
        >
          <div 
            className="glass max-w-2xl w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-12 relative">
              <button 
                onClick={closeProject}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 text-blue-300 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-transparent">
                   <button 
                    onClick={closeProject}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                   >
                     Tutup Detail
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 md:pb-24 px-4 sm:px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="mb-8 p-1.5 rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 animate-float shadow-2xl shadow-blue-500/20">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.3rem] overflow-hidden bg-slate-900 flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="z-10 flex flex-col items-center">
                 <span className="text-white font-black text-5xl md:text-7xl tracking-tighter drop-shadow-2xl">KK</span>
                 <div className="h-1 w-12 bg-blue-400 rounded-full mt-2 group-hover:w-20 transition-all duration-500"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            Hi, I'm <span className="text-gradient">{PERSONAL_INFO.nickname}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium mb-8 max-w-2xl px-4">
            {PERSONAL_INFO.title} dari {PERSONAL_INFO.location}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 px-4">
            <a 
              href="#contact" 
              className="px-6 sm:px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all shadow-lg shadow-white/5 active:scale-95 text-sm sm:text-base"
            >
              Get in Touch
            </a>
            <a 
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 glass text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 text-sm sm:text-base"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* About Section - ENHANCED */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Tentang Pangeran Karel" subtitle="Eksplorasi perjalanan kreativitas dan teknologi saya." />
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Akademik', value: '3.41 IPK', color: 'blue' },
              { label: 'Kelulusan', value: '3.5 Tahun', color: 'purple' },
              { label: 'Semester', value: '7 Selesai', color: 'indigo' },
              { label: 'Status', value: 'Fresh Grad', color: 'green' }
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-3xl text-center border-white/5 hover:border-blue-500/30 transition-all group">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1 group-hover:text-blue-400 transition-colors">{stat.label}</p>
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
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">01</span>
                  The Vision
                </h3>
                
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                  Sebagai lulusan <span className="text-white font-semibold">Teknik Informatika</span> yang bersemangat, saya tidak hanya sekadar menulis kode, tapi membangun solusi. Fokus saya adalah pada ekosistem <span className="text-blue-400 font-bold">MERN Stack</span> dan pengembangan mobile.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pilar Belajar</h4>
                    <ul className="space-y-3">
                      {['Full Stack JS (CodePolitan)', 'MERN Stack (BuildWithAngga)', 'Autodidact YouTube & Docs'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Sisi Kreatif</h4>
                    <ul className="space-y-3">
                      {['UI/UX Design Specialist', 'Logo & Branding Designer', 'Clothing Line Designer'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
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
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-white mb-2">Team Leader</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Aktif berorganisasi dan memimpin pembelajaran teknologi di Study Club KMK.</p>
                </div>
                <div className="glass p-6 rounded-[2rem] border-white/5 hover:bg-purple-600/5 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h4 className="font-bold text-white mb-2">Fast Learner</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Menyelesaikan gelar S1 hanya dalam 3.5 tahun dengan penguasaan teknologi modern.</p>
                </div>
              </div>
            </div>

            {/* Education & Info Side Card */}
            <div className="lg:col-span-2 sticky top-28 space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border-blue-500/20 shadow-xl shadow-blue-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                  Jejak Pendidikan
                </h4>
                
                <div className="space-y-8">
                  <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                    <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{EDUCATION.period}</p>
                    <h5 className="font-bold text-white text-lg leading-tight mb-2">{EDUCATION.university}</h5>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {EDUCATION.degree}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase">Gelar</p>
                        <p className="text-sm font-bold text-white">S.Kom (Cand.)</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase">IPK</p>
                        <p className="text-sm font-bold text-blue-400">{EDUCATION.ipk}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-5 rounded-3xl bg-blue-600/5 border border-blue-500/10">
                   <p className="text-xs text-slate-400 leading-relaxed italic">
                     "Pendidikan adalah senjata paling ampuh yang bisa digunakan untuk mengubah dunia. Saya siap berkontribusi."
                   </p>
                </div>
              </div>

              {/* Contact Card Mini */}
              <div className="glass p-6 rounded-[2rem] border-white/5 flex items-center justify-between group">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Butuh CV Lengkap?</p>
                  <p className="text-sm text-white font-bold">Kirim pesan ke email saya</p>
                </div>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-white/10">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <SectionTitle title="Kemampuan & Teknologi" align="center" />
          
          <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
            {SKILLS.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(cat.title)}
                className={`whitespace-nowrap px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat.title 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 transition-all">
            {SKILLS.find(c => c.title === activeTab)?.skills.map((skill) => (
              <div 
                key={skill} 
                className="glass p-4 rounded-xl text-center hover:border-blue-500/50 hover:scale-105 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-800 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-500/20">
                  <span className="text-blue-400 text-[10px] font-bold">{skill.substring(0, 3).toUpperCase()}</span>
                </div>
                <p className="text-[13px] sm:text-sm font-semibold truncate">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Proyek Pilihan" subtitle="Klik kartu untuk melihat detail selengkapnya." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
            {PROJECTS.map((project, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(project)}
                className="group relative glass rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border border-slate-800/50 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:-translate-y-3 hover:scale-[1.03] cursor-pointer"
              >
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
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-[10px] md:text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50 group-hover:border-blue-500/30 transition-all">
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
      <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Pengalaman Kerja & Organisasi" align="center" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative pl-10 md:pl-0">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-800"></div>
                
                <div className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full glass p-6 sm:p-8 rounded-3xl hover:bg-slate-900 transition-colors border-slate-800 hover:border-blue-500/30">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-400">{exp.title}</h3>
                      <span className="text-[11px] sm:text-sm font-medium text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md">{exp.duration}</span>
                    </div>
                    <p className="font-semibold text-white mb-4 text-sm sm:text-base">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-400 text-xs sm:text-sm flex gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span> {item}
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
        <div className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-[2rem] sm:rounded-[2.5rem] text-center overflow-hidden relative border-slate-800 shadow-2xl">
          <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Mari Berkolaborasi</h2>
          <p className="text-slate-400 mb-10 sm:mb-12 max-w-xl mx-auto text-base sm:text-lg">
            Tertarik untuk merekrut saya untuk proyek Anda? Jangan ragu untuk menghubungi saya melalui kontak di bawah ini.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-6 sm:p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-blue-500/40 shadow-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-blue-500/20 group-hover:rotate-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Email</p>
              <p className="font-bold text-xs sm:text-sm truncate text-slate-200">{PERSONAL_INFO.email}</p>
            </a>
            
            <a href={`tel:${PERSONAL_INFO.phone}`} className="p-6 sm:p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-green-500/40 shadow-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-green-500/20 group-hover:-rotate-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">WA / Phone</p>
              <p className="font-bold text-xs sm:text-sm text-slate-200">{PERSONAL_INFO.phone}</p>
            </a>

            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-6 sm:p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl hover:scale-105 transition-all group hover:border-indigo-500/40 shadow-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">LinkedIn</p>
              <p className="font-bold text-xs sm:text-sm text-slate-200">Karell Kalang</p>
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
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">React JS</span>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">Tailwind CSS</span>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5">Gemini AI</span>
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
