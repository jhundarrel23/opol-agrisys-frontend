import React, { useState, useEffect } from "react";

const sections = [
  { id: "program-overview", label: "Program Overview" },
  { id: "moa-information", label: "MOA Information" },
  { id: "beneficiary-directory", label: "Beneficiary Directory" },
  { id: "news-updates", label: "News & Updates" },
  { id: "photo-gallery", label: "Photo Gallery" },
  { id: "contact-information", label: "Contact Information" }
];

// Logo Component
const AgroConnectLogo = () => (
  <div className="flex items-center space-x-3">
    {/* Agricultural Icon/Logo */}
    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
      <svg 
        className="w-6 h-6 text-white" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2L13.09 8.26L15 7L14.08 9.74L16 9L15.92 12H8.08L8 9L9.92 9.74L9 7L10.91 8.26L12 2Z"/>
        <path d="M12 14C10.9 14 10 14.9 10 16V22H14V16C14 14.9 13.1 14 12 14Z"/>
        <path d="M8 16C6.9 16 6 16.9 6 18V22H10V18C10 16.9 9.1 16 8 16Z"/>
        <path d="M16 16C14.9 16 14 16.9 14 18V22H18V18C18 16.9 17.1 16 16 16Z"/>
      </svg>
    </div>
    
    {/* Brand Text */}
    <div className="flex flex-col">
      <span className="text-xl font-bold text-white tracking-wide">
        Agro Connect
      </span>
      <span className="text-xs text-green-200 font-medium -mt-1">
        Agricultural Systems
      </span>
    </div>
  </div>
);

export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle section highlighting based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-green-100" 
          : "bg-gradient-to-r from-green-600 via-green-500 to-blue-600 shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {isScrolled ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L15 7L14.08 9.74L16 9L15.92 12H8.08L8 9L9.92 9.74L9 7L10.91 8.26L12 2Z"/>
                    <path d="M12 14C10.9 14 10 14.9 10 16V22H14V16C14 14.9 13.1 14 12 14Z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Agro Connect
                </span>
              </div>
            ) : (
              <AgroConnectLogo />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleScroll(section.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? activeSection === section.id
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    : activeSection === section.id
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                      : "text-white/90 hover:bg-white/20 hover:text-white"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isScrolled
                  ? "text-gray-600 hover:bg-green-50"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`pb-4 pt-2 space-y-2 ${
            isScrolled ? "bg-white" : "bg-black/10 backdrop-blur-sm rounded-lg mt-2"
          }`}>
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleScroll(section.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? activeSection === section.id
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      : "text-gray-700 hover:bg-green-50"
                    : activeSection === section.id
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}