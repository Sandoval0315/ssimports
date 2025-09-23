import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MagnifyingGlass } from 'phosphor-react';
import useNavbarTheme from '../../hooks/useNavbarTheme'; // Importar el hook unificado
import './MiddlePage.css';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MiddlePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const middleRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

  // Para crear efecto de transición visual al entrar a la sección oscura
  const { scrollYProgress } = useScroll({
    target: middleRef,
    offset: ["start end", "end start"]
  });

  // Efecto de oscurecimiento gradual al entrar a la sección
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 1]);

  // Para detectar si está en vista
  const isInView = useInView(middleRef, { once: true, amount: 0.3 });

  // Usar el hook unificado para cambiar el tema del navbar
  useNavbarTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del contenido
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: middleRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Entrada del título
      tl.fromTo(titleRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)"
      });

      // Entrada del subtítulo
      tl.fromTo(subtitleRef.current, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8");

      // Entrada del buscador
      tl.fromTo(searchRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.95
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)"
      }, "-=0.6");

      // Entrada de la imagen (sin parallax)
      tl.fromTo(imageRef.current, {
        x: 50,
        opacity: 0,
        scale: 0.9
      }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1");

      // Efecto de flotación sutil en la imagen
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Efecto de brillo sutil en el título
      gsap.to(titleRef.current, {
        textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Efecto de hover para el buscador
      const searchContainer = searchRef.current;
      if (searchContainer) {
        const handleMouseEnter = () => {
          gsap.to(searchContainer, {
            scale: 1.02,
            y: -3,
            boxShadow: "0 25px 50px rgba(255, 255, 255, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(searchContainer, {
            scale: 1,
            y: 0,
            boxShadow: "0 15px 35px rgba(255, 255, 255, 0.05)",
            duration: 0.3,
            ease: "power2.out"
          });
        };

        searchContainer.addEventListener('mouseenter', handleMouseEnter);
        searchContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          searchContainer.removeEventListener('mouseenter', handleMouseEnter);
          searchContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, middleRef);

    return () => ctx.revert();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Aquí puedes agregar la lógica de búsqueda
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Aquí puedes agregar la lógica de búsqueda
    }
  };

  return (
    <section className="middle-page" ref={middleRef}>
      {/* Fondo estático con degradado radial */}
      <div className="middle-page__background" ref={backgroundRef}></div>
      
      {/* Overlay para efecto de transición visual al entrar a la sección oscura */}
      <motion.div 
        className="middle-page__dark-overlay"
        style={{ opacity: backgroundOpacity }}
      ></motion.div>

      <div className="middle-page__container" ref={containerRef}>
        <div className="middle-page__content">
          {/* Título principal */}
          <motion.h1 
            className="middle-page__title" 
            ref={titleRef}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 50, opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            You ask, we deliver.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="middle-page__subtitle" 
            ref={subtitleRef}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.4,
              ease: "easeOut"
            }}
          >
            Feel free to search or request, fulfill your dreams.
          </motion.p>

          {/* Buscador */}
          <motion.div 
            className="middle-page__search-container" 
            ref={searchRef}
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 40, opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              type: "spring",
              stiffness: 120
            }}
          >
            <form onSubmit={handleSubmit} className="middle-page__search-form">
              <div className={`middle-page__search-wrapper ${isFocused ? 'middle-page__search-wrapper--focused' : ''}`}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearch}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter model, release date, brand..."
                  className="middle-page__search-input"
                />
                <button 
                  type="submit"
                  className="middle-page__search-button"
                  disabled={!searchTerm.trim()}
                >
                  <MagnifyingGlass size={20} weight="bold" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

         {/* Imagen fuera del container - posicionada absolutamente a la sección */}
      <motion.div 
        className="middle-page__image-container"
        initial={{ x: 50, opacity: 0, scale: 0.9 }}
        animate={isInView ? { x: 0, opacity: 1, scale: 1 } : { x: 50, opacity: 0, scale: 0.9 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.3,
          ease: "easeOut"
        }}
      >
        <img 
          ref={imageRef}
          src="/images/banner1.png" 
          alt="Sports Cars Banner" 
          className="middle-page__image"
        />
      </motion.div>
    </section>
  );
};

export default MiddlePage;