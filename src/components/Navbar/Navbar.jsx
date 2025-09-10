import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { MagnifyingGlass } from 'phosphor-react';
import './Navbar.css';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const searchInputRef = useRef(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    tl.fromTo(".navbar__nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.2"
    );
  }, []);

  // Toggle search
  const toggleSearch = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      gsap.fromTo(".navbar__search-input",
        { width: 0, opacity: 0 },
        { width: "180px", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(".navbar__search-input",
        { 
          width: 0, 
          opacity: 0, 
          duration: 0.2, 
          ease: "power2.in",
          onComplete: () => {
            setIsSearchOpen(false);
            setSearchTerm('');
          }
        }
      );
    }
  };

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogoHover = (isHovering) => {
    gsap.to(logoRef.current, {
      scale: isHovering ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  return (
    <>
      <motion.nav 
        ref={navRef}
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="navbar__container">
          {/* Logo */}
          <motion.div 
            ref={logoRef}
            className="navbar__logo"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
              {/* Logo 
            <img 
              src="" 
              className="navbar__logo-img"
            />
            */}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="navbar__nav-desktop">
            <motion.a 
              href="/" 
              className="navbar__nav-item"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Welcome
            </motion.a>

            <motion.a 
              href="/catalogo" 
              className="navbar__nav-item"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Catalogue
            </motion.a>

            <motion.a 
              href="/about" 
              className="navbar__nav-item"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.a>

            <motion.a 
              href="/contact" 
              className="navbar__nav-item"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>

            {/* Search */}
            <div className="navbar__search">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="navbar__search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "180px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <motion.button
                className="navbar__search-btn"
                onClick={toggleSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MagnifyingGlass size={18} weight="bold" />
              </motion.button>
            </div>

            {/* Logo */}
            <motion.div 
              ref={logoRef}
              className="navbar__logo"
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="navbar__logo-img"
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}></span>
            <span className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}></span>
            <span className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}></span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="navbar__mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="navbar__mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="navbar__mobile-header">
                <span>Navegación</span>
                <button 
                  className="navbar__mobile-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="navbar__mobile-nav">
                <a href="/" className="navbar__mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
                  Welcome
                </a>
                <a href="/catalogo" className="navbar__mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
                  Catalogue
                </a>
                <a href="/about" className="navbar__mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
                  About Us
                </a>
                <a href="/contact" className="navbar__mobile-item" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </a>
                
                <div className="navbar__mobile-search">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="navbar__mobile-search-input"
                  />
                  <MagnifyingGlass size={18} weight="bold" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;