// useNavbarTheme.js - Hook unificado para manejar el tema del navbar

import { useEffect } from 'react';

const useNavbarTheme = () => {
  useEffect(() => {
    const changeNavbarTheme = (isDark) => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (isDark) {
          navbar.classList.add('navbar--dark');
        } else {
          navbar.classList.remove('navbar--dark');
        }
      }
    };

    let darkSectionsVisible = new Set(); // Para trackear qué secciones oscuras están visibles
    let lastScrollY = window.scrollY; // Para detectar dirección del scroll

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        entries.forEach((entry) => {
          const sectionClass = entry.target.className;
          
          // Identificar secciones oscuras
          if (sectionClass.includes('middle-page') || sectionClass.includes('gif-section')) {
            const sectionId = entry.target.className;
            const rect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Lógica mejorada que considera la dirección del scroll y posición exacta
            const isTopVisible = rect.top < viewportHeight * 0.8; // Sección empieza a aparecer
            const isBottomVisible = rect.bottom > viewportHeight * 0.2; // Sección aún no desaparece completamente
            const isSectionActive = isTopVisible && isBottomVisible;
            
            // Detectar si estamos scrolleando hacia arriba desde la primera sección oscura
            const isScrollingUpFromGifSection = scrollDirection === 'up' && 
                                                sectionClass.includes('gif-section') && 
                                                rect.top > 0;
            
            if (isSectionActive && !isScrollingUpFromGifSection) {
              darkSectionsVisible.add(sectionId);
            } else {
              darkSectionsVisible.delete(sectionId);
            }
            
            // Cambiar tema basado en si hay alguna sección oscura visible
            changeNavbarTheme(darkSectionsVisible.size > 0);
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // Todos los puntos posibles
        rootMargin: '0px 0px 0px 0px' // Sin margen para mayor precisión
      }
    );

    // Observar todas las secciones oscuras
    const middlePage = document.querySelector('.middle-page');
    const gifSection = document.querySelector('.gif-section');
    
    if (middlePage) {
      observer.observe(middlePage);
    }
    if (gifSection) {
      observer.observe(gifSection);
    }

    return () => {
      observer.disconnect();
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('navbar--dark');
      }
    };
  }, []);
};

export default useNavbarTheme;