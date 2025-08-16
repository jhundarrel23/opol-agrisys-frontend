import React, { useEffect, useRef, useState } from "react";

const sections = [
  { id: "program-overview", label: "Program Overview" },
  { id: "moa-information", label: "MOA Information" },
  { id: "beneficiary-directory", label: "Beneficiary Directory" },
  { id: "news-updates", label: "News & Updates" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "contact-information", label: "Contact Information" }
];

export default function TopBar() {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(80);
  const navRef = useRef(null);

  useEffect(() => {
    const computeOffset = () => {
      const height = navRef.current ? navRef.current.offsetHeight : 80;
      setHeaderOffset(height);
    };
    computeOffset();
    window.addEventListener("resize", computeOffset);
    return () => window.removeEventListener("resize", computeOffset);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + headerOffset + 1;
      let currentId = null;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollPosition) {
          currentId = id;
        }
      }
      setActiveSectionId(currentId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerOffset]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset - 4;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-gradient-to-r from-blue-700/95 to-blue-500/95 backdrop-blur shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white text-lg font-bold tracking-wide hover:text-yellow-200 transition-colors"
        >
          OPOL AGRISYS
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`px-3 py-2 rounded-lg font-medium transition-colors duration-300 ${
                activeSectionId === section.id
                  ? "bg-white text-blue-700 shadow"
                  : "text-white hover:bg-white hover:text-blue-700"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex">
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="ml-3 inline-flex items-center rounded-lg bg-white px-4 py-2 font-semibold text-blue-700 shadow hover:shadow-md transition"
          >
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            className="inline-flex items-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="primary-menu" className={`md:hidden border-t border-white/10 ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="container mx-auto px-6 py-3 grid grid-cols-1 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                activeSectionId === section.id
                  ? "bg-white text-blue-700 shadow"
                  : "text-white hover:bg-white hover:text-blue-700"
              }`}
            >
              {section.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 font-semibold text-blue-700 shadow hover:shadow-md transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
