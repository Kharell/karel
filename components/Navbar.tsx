
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Kemampuan', href: '#skills' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Pengalaman', href: '#experience' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-6xl mx-auto glass rounded-2xl px-4 md:px-6 py-3 flex justify-between items-center shadow-xl relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20 group cursor-pointer">
            <span className="text-white font-black text-sm tracking-tighter group-hover:scale-110 transition-transform">KK</span>
          </div>
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-blue-400">Karel</span> Kalang <span className="text-purple-400">.</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-blue-400 transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className="hidden sm:block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Hubungi Saya
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 glass rounded-2xl md:hidden animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-blue-400 font-medium py-2 border-b border-white/5 last:border-0 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="sm:hidden bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold mt-2"
              >
                Hubungi Saya
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
