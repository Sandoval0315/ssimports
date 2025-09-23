import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useNavbarTheme from '../../hooks/useNavbarTheme'; // Importar el hook unificado
import './Gif.css';

const GifSection = ({ 
  gifSrc = "/videos/car2.gif", 
  altText = "Car driving animation",
  overlayText = "Experience the Drive",
  subText = "Feel the power of automotive excellence"
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Usar el hook unificado para cambiar el tema del navbar
  useNavbarTheme();

  return (
    <section className="gif-section" ref={sectionRef}>
      {/* GIF de fondo sin efectos */}
      <div className="gif-wrapper">
        <img 
          src={gifSrc}
          alt={altText}
          className="gif-fullscreen"
          loading="lazy"
        />
      </div>

      {/* Texto superpuesto minimalista */}
      <div className="gif-text-overlay">
        <motion.h2 
          className="gif-main-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {overlayText}
        </motion.h2>
        
        <motion.p 
          className="gif-sub-text"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subText}
        </motion.p>
      </div>
    </section>
  );
};

export default GifSection;