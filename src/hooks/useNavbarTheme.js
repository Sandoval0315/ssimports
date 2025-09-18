// useNavbarTheme.js - Hook personalizado para manejar el tema del navbar
import { useEffect } from 'react';

export const useNavbarTheme = () => {
  useEffect(() => {
    // Función para cambiar el tema del navbar
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

    // Crear el observer para detectar la sección middle-page
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('middle-page')) {
            // Si la sección middle-page está visible (más del 20%)
            changeNavbarTheme(entry.isIntersecting && entry.intersectionRatio > 0.2);
          }
        });
      },
      {
        // Configuración del observer
        threshold: [0.2, 0.8], // Se activa cuando 20% o 80% está visible
        rootMargin: '-10% 0px -10% 0px' // Margen para activar antes
      }
    );

    // Observar la sección middle-page
    const middlePage = document.querySelector('.middle-page');
    if (middlePage) {
      observer.observe(middlePage);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      // Limpiar el tema oscuro al desmontar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('navbar--dark');
      }
    };
  }, []);
};