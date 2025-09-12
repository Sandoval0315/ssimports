import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap/dist/gsap';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const mainImageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardRef = useRef(null);
  const galleryRef = useRef(null);

  // Framer Motion hooks para parallax
  const { scrollYProgress } = useScroll();
  const carY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const carRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Para detectar si está en vista
  const isInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación inicial sutil con GSAP
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.from(galleryRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__content">
        <div className='hero__car1'>
          {/* Contenido principal reorganizado */}
          <div className="hero__main-content">
            {/* Texto a la izquierda */}
            <motion.div 
              className="hero__text-content"
              style={{ y: textY }}
              initial={{ x: -100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.p 
                className='hero__car1-title' 
                ref={titleRef}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Ferrari 288 GTO
              </motion.p>
              <motion.p 
                className='hero__car1-description' 
                ref={descriptionRef}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Unveiled in 1984, stands as one of the brand's most iconic models. 
                Originally designed for Group B homologation, it blends elegance with 
                aggressive styling, borrowing the silhouette of the 308 but with a more 
                muscular presence. Power comes from a twin-turbo 2.8-liter V8 producing 
                over 400 horsepower, pushing the car to a top speed of around 305 km/h—remarkable 
                figures for its time.
              </motion.p>
            </motion.div>
                       
            {/* Imagen del carro completamente centrada */}
            <motion.div 
              className="hero__main-image" 
              ref={mainImageRef}
              style={{ 
                y: carY, 
                rotate: carRotate 
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="/images/car1.png" 
                alt="Ferrari 288 GTO main view"
                whileHover={{ 
                  filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>

            {/* Card de especificaciones a la derecha */}
            <motion.div 
              className="hero__side-card hero__side-card--right" 
              ref={cardRef}
              style={{ y: cardY }}
              initial={{ x: 100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="hero__card-content">
                <motion.h3 
                  className="hero__card-title"
                  initial={{ y: 10, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Especificaciones
                </motion.h3>
                <div className="hero__card-specs">
                  {[
                    { label: "Motor", value: "2.8L V8 Twin-Turbo" },
                    { label: "Potencia", value: "400+ HP" },
                    { label: "Vel. Máx", value: "305 km/h" },
                    { label: "Año", value: "1984" }
                  ].map((spec, index) => (
                    <motion.div 
                      key={spec.label}
                      className="hero__spec"
                      initial={{ x: 20, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                      whileHover={{ 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="hero__spec-label">{spec.label}</span>
                      <span className="hero__spec-value">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
           
          {/* Galería de imágenes con controles (sin cambios) */}
          <div className="hero__gallery" ref={galleryRef}>
            <ChevronLeft size={55} color='black' className="hero__gallery-arrow hero__gallery-arrow--left" />
                       
            <div className="hero__gallery-images">
              <img src="/images/car1view2.png" alt="Ferrari 288 GTO view 2" className="hero__gallery-image" />
              <img src="/images/car1view1.png" alt="Ferrari 288 GTO view 1" className="hero__gallery-image" />
              <img src="/images/car1view3.png" alt="Ferrari 288 GTO view 3" className="hero__gallery-image" />
            </div>
                       
            <ChevronRight size={55} color='black' className="hero__gallery-arrow hero__gallery-arrow--right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;