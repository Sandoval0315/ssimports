import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const bgTextRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const contactRef = useRef(null);
  const navLinksRef = useRef([]);
  const copyrightRef = useRef(null);
  const legalRef = useRef(null);
  const locationRef = useRef(null);

  // Función para agregar refs a los nav links
  const addToNavLinksRef = (el) => {
    if (el && !navLinksRef.current.includes(el)) {
      navLinksRef.current.push(el);
    }
  };

  useEffect(() => {
    // Cargar ScrollTrigger dinámicamente para evitar errores de Astro
    const loadScrollTrigger = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
          // Timeline principal de entrada cuando aparece en pantalla
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });

          // Animación del contenedor principal
          tl.fromTo(
            footerRef.current,
            { opacity: 0},
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          );

          // Animación del contacto con efecto typewriter
          tl.fromTo(
            contactRef.current,
            { opacity: 0, x: -30 },
            "-=0.7"
          );

          // Animación de los nav links individualmente
          tl.fromTo(
            navLinksRef.current,
            { opacity: 0, y: -15, rotationX: 90 },
            { 
              opacity: 1, 
              y: 0, 
              rotationX: 0,
              duration: 0.6, 
              stagger: 0.1, 
              ease: 'back.out(1.4)' 
            },
            "-=0.5"
          );

          // Animación del contenido inferior con stagger
          tl.fromTo(
            [copyrightRef.current, legalRef.current, locationRef.current],
            { opacity: 0, y: 30, x: (i) => i % 2 === 0 ? -20 : 20 },
            { 
              opacity: 1, 
              y: 0, 
              x: 0,
              duration: 0.8, 
              stagger: 0.2, 
              ease: 'power2.out' 
            },
            "-=1"
          );

          // Efecto de pulsación continua en las letras SS©
          gsap.to(bgTextRef.current, {
            scale: 1.02,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });

          // Hover effects para los nav links
          navLinksRef.current.forEach(link => {
            if (link) {
              const hoverIn = () => {
                gsap.to(link, {
                  y: -3,
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out"
                });
              };

              const hoverOut = () => {
                gsap.to(link, {
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              };

              link.addEventListener('mouseenter', hoverIn);
              link.addEventListener('mouseleave', hoverOut);
            }
          });

          // Parallax sutil en las letras SS© con scroll
          gsap.to(bgTextRef.current, {
            y: -30,
            opacity: 0.8,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              ease: "none"
            }
          });

          // Animación de entrada del email con efecto especial
          gsap.fromTo(
            ".footer__email",
            { 
              opacity: 0,
              backgroundPosition: "0% 50%",
              backgroundSize: "0% 2px"
            },
            { 
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.5
            }
          );

          // Efecto de ondas en el fondo (sutil)
          gsap.set(footerRef.current, {
            background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)"
          });

        }, footerRef);

        return () => {
          ctx.revert();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        
      } catch (error) {
        console.log('ScrollTrigger no pudo cargarse, usando animaciones básicas:', error);
        // Fallback sin ScrollTrigger
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.5 });
          
          tl.fromTo(
            footerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          )
          .fromTo(
            bgTextRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.7)' },
            "-=0.5"
          );

        }, footerRef);

        return () => ctx.revert();
      }
    };

    loadScrollTrigger();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      {/* Contenido superior */}
      <div className="footer__top" ref={topRef}>
        <div className="footer__contact" ref={contactRef}>
          <span>Contact us: </span>
          <span className='footer__email'>&nbsp;ssimport@pages.com</span>
        </div>
                 
        <div className="footer__nav">
          <a href="/" className="footer__nav-link" ref={addToNavLinksRef}>Welcome</a>
          <span className="footer__nav-separator">/</span>
          <a href="/catalogo" className="footer__nav-link" ref={addToNavLinksRef}>Catalogue</a>
          <span className="footer__nav-separator">/</span>
          <a href="/about" className="footer__nav-link" ref={addToNavLinksRef}>About Us</a>
          <span className="footer__nav-separator">/</span>
          <a href="/contact" className="footer__nav-link" ref={addToNavLinksRef}>Contact Us</a>
        </div>
      </div>

      {/* Texto gigante "SS©" en el centro */}
      <div className="footer__center">
        <span className="footer__big-text" ref={bgTextRef}>SS©</span>
      </div>

      {/* Contenido inferior */}
      <div className="footer__bottom" ref={bottomRef}>
        <div className="footer__copyright" ref={copyrightRef}>
          <span>&copy; {new Date().getFullYear()} SSimports. All rights reserved.</span>
        </div>

        <div className="footer__legal" ref={legalRef}>
          <a href="/terms">Terms and Conditions</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>

        <div className="footer__location" ref={locationRef}>
          <span>San Salvador, El Salvador</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;