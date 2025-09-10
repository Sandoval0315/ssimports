import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const bgTextRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animar el footer principal
    tl.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animar las letras SS© más dramático
    tl.fromTo(
      bgTextRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.7)' },
      "-=0.5"
    );

    // Animar contenido superior
    tl.fromTo(
      topRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      "-=1"
    );

    // Animar contenido inferior
    tl.fromTo(
      bottomRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      "-=0.3"
    );
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Contenido superior */}
      <div className="footer__top" ref={topRef}>
        <div className="footer__contact">
          <span>Contact us: </span>
          <a href="mailto:ssimport@pages.com" className="footer__email">
            ssimport@pages.com
          </a>
        </div>
        
        <div className="footer__nav">
          <a href="/" className="footer__nav-link">Welcome</a>
          <span className="footer__nav-separator">/</span>
          <a href="/catalogo" className="footer__nav-link">Catalogue</a>
          <span className="footer__nav-separator">/</span>
          <a href="/about" className="footer__nav-link">About Us</a>
          <span className="footer__nav-separator">/</span>
          <a href="/contact" className="footer__nav-link">Contact Us</a>
        </div>
      </div>

      {/* Texto gigante "SS©" en el centro */}
      <div className="footer__center">
        <span className="footer__big-text" ref={bgTextRef}>SS©</span>
      </div>

      {/* Contenido inferior */}
      <div className="footer__bottom" ref={bottomRef}>
        <div className="footer__copyright">
          <span>&copy; {new Date().getFullYear()} SSimports. All rights reserved.</span>
        </div>

        <div className="footer__legal">
          <a href="/terms">Terms and Conditions</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>

        <div className="footer__location">
          <span>San Salvador, El Salvador</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;