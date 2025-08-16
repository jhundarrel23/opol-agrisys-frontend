import React, { useEffect, useRef, useState } from "react";
import "./TopBar.css";

const sections = [
  { id: "program-overview", label: "Program Overview" },
  { id: "moa-information", label: "MOA Information" },
  { id: "beneficiary-directory", label: "Beneficiary Directory" },
  { id: "news-updates", label: "News & Updates" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "contact-information", label: "Contact Information" }
];

// Agro Connect Logo Component
const AgroConnectLogo = ({ isScrolled }) => (
  <div className="logo-container">
    <div className="logo-icon-wrapper">
      <svg 
        className="logo-svg" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2L13.09 8.26L15 7L14.08 9.74L16 9L15.92 12H8.08L8 9L9.92 9.74L9 7L10.91 8.26L12 2Z"/>
        <path d="M12 14C10.9 14 10 14.9 10 16V22H14V16C14 14.9 13.1 14 12 14Z"/>
        <path d="M8 16C6.9 16 6 16.9 6 18V22H10V18C10 16.9 9.1 16 8 16Z"/>
        <path d="M16 16C14.9 16 14 16.9 14 18V22H18V18C18 16.9 17.1 16 16 16Z"/>
      </svg>
    </div>
    <div className="logo-text-wrapper">
      <span className="logo-main-text">Agro Connect</span>
      <span className="logo-sub-text">Agricultural Systems</span>
    </div>
  </div>
);

export default function TopBar() {
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(80);
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(window.scrollY > 10);
      
      let currentId = null;
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          currentId = id;
        }
      });
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
    <nav 
      ref={navRef} 
      className={`topbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="topbar-container">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="logo-button"
        >
          <AgroConnectLogo isScrolled={isScrolled} />
        </button>

        <div className="desktop-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`nav-item ${activeSectionId === section.id ? 'active' : ''}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="desktop-actions">
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="login-button"
          >
            Login
          </button>
        </div>

        <div className="mobile-menu-wrapper">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            className="mobile-menu-toggle"
          >
            <svg className="menu-icon" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="primary-menu" className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSectionId === section.id ? "page" : undefined}
              className={`mobile-nav-item ${activeSectionId === section.id ? 'active' : ''}`}
            >
              {section.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("login-options")}
            className="mobile-login-button"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
