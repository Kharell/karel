import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State untuk kontrol muncul/sembunyi
  const [lastScrollY, setLastScrollY] = useState(0); // Simpan posisi scroll terakhir

  const toggleMenu = () => setIsOpen(!isOpen);

  // Efek untuk memantau scroll (Muncul/Sembunyi & Glass Effect)
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // 1. Logika untuk Glass Effect (saat tidak di paling atas)
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Logika Muncul/Sembunyi (Auto-Hide)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Jika scroll ke bawah dan sudah melewati 100px, sembunyikan
        setIsVisible(false);
        setIsOpen(false); // Tutup menu mobile jika sedang terbuka saat di-scroll
      } else {
        // Jika scroll ke atas, munculkan kembali
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Tentang", href: "#about" },
    { name: "Kemampuan", href: "#skills" },
    { name: "Proyek", href: "#projects" },
    { name: "Pengalaman", href: "#experience" },
  ];

  return (
    // Transform translate-y digunakan untuk menyembunyikan navbar ke atas
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "py-2" : "py-4"}`}>
      <div
        className={`max-w-6xl mx-auto transition-all duration-500 rounded-2xl px-4 md:px-6 py-3 flex justify-between items-center relative ${
          isScrolled
            ? "glass shadow-2xl border-white/10 backdrop-blur-xl"
            : "bg-transparent border-transparent"
        }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20 group cursor-pointer">
            <span className="text-white font-black text-sm tracking-tighter group-hover:scale-110 transition-transform">
              KK
            </span>
          </div>
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-blue-400">Karel</span> Kalang{" "}
            <span className="text-purple-400">.</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="hover:text-blue-400 transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="hidden sm:block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Hubungi Saya
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 glass rounded-2xl md:hidden animate-in slide-in-from-top-4 duration-200 shadow-2xl border border-white/10">
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-slate-300 hover:text-blue-400 font-medium py-2 border-b border-white/5 last:border-0 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
