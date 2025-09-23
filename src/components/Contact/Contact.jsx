import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import './Contact.css';

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundShapeRef = useRef(null);
  const cursorRef = useRef(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Función para agregar inputs a la ref
  const addToInputsRef = (el) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el);
    }
  };

  // Tracking del mouse para efectos
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = contactRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    contactRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => contactRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Cargar ScrollTrigger dinámicamente
    const loadScrollTrigger = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
          // Animación de entrada principal
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });

          // Animación del fondo morphing
          tl.fromTo(
            backgroundShapeRef.current,
            { 
              scale: 0,
              rotation: 180,
              opacity: 0,
              borderRadius: "50%"
            },
            { 
              scale: 1,
              rotation: 0,
              opacity: 1,
              borderRadius: "20px",
              duration: 2,
              ease: "elastic.out(1, 0.3)"
            }
          );

          // Entrada del contenedor principal
          tl.fromTo(
            containerRef.current,
            { 
              y: 80,
              opacity: 0,
              scale: 0.8,
              rotationX: 45
            },
            { 
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 1.5,
              ease: "power3.out"
            },
            "-=1.5"
          );

          // Título con efecto de escritura
          tl.fromTo(
            titleRef.current,
            { 
              y: -30,
              opacity: 0,
              scale: 0.8
            },
            { 
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.4)"
            },
            "-=1"
          );

          // Descripción con efecto wave
          tl.fromTo(
            descriptionRef.current,
            { 
              y: 20,
              opacity: 0,
              filter: "blur(10px)"
            },
            { 
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power2.out"
            },
            "-=0.8"
          );

          // Inputs aparecen con stagger y morfing
          tl.fromTo(
            inputsRef.current,
            { 
              y: 40,
              opacity: 0,
              scale: 0.9,
              rotationY: 45
            },
            { 
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.2)"
            },
            "-=0.6"
          );

          // Botón con efecto especial
          tl.fromTo(
            buttonRef.current,
            { 
              scale: 0,
              rotation: 180,
              opacity: 0
            },
            { 
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 1,
              ease: "elastic.out(1, 0.4)"
            },
            "-=0.3"
          );

          // Efectos de hover para inputs
          inputsRef.current.forEach(input => {
            if (input) {
              const focusIn = () => {
                gsap.to(input, {
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              };

              const focusOut = () => {
                gsap.to(input, {
                  scale: 1,
                  y: 0,
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                  duration: 0.3,
                  ease: "power2.out"
                });
              };

              input.addEventListener('focus', focusIn);
              input.addEventListener('blur', focusOut);
            }
          });

          // Efecto continuo de respiración en el fondo
          gsap.to(backgroundShapeRef.current, {
            scale: 1.05,
            opacity: 0.8,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });

          // Parallax sutil del container
          gsap.to(containerRef.current, {
            y: -20,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              ease: "none"
            }
          });

        }, contactRef);

        return () => {
          ctx.revert();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
        
      } catch (error) {
        console.log('ScrollTrigger no disponible, usando animaciones básicas');
        // Fallback básico
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.3 });
          
          tl.fromTo(
            containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
          )
          .fromTo(
            inputsRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
            "-=0.5"
          );

        }, contactRef);

        return () => ctx.revert();
      }
    };

    loadScrollTrigger();
  }, []);

  // Manejo del submit con animación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animación de envío
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(buttonRef.current, {
          rotation: 360,
          scale: 1.1,
          duration: 0.5,
          ease: "back.out(1.4)",
          onComplete: () => {
            // Simular envío
            setTimeout(() => {
              setIsSubmitting(false);
              gsap.to(buttonRef.current, {
                scale: 1,
                rotation: 0,
                duration: 0.3
              });
            }, 1500);
          }
        });
      }
    });
  };

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div 
        className="contact__cursor" 
        ref={cursorRef}
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`
        }}
      ></div>

      {/* Forma de fondo animada */}
      <div className="contact__background">
        <div className="contact__background-shape" ref={backgroundShapeRef}></div>
      </div>

      {/* Contenido principal */}
      <div className="contact__container" ref={containerRef}>
        <div className="contact__content">
          <h2 className="contact__title" ref={titleRef}>
            Let's Create Something
            <span className="contact__title-accent">Amazing</span>
          </h2>
          
          <p className="contact__description" ref={descriptionRef}>
            Ready to transform your vision into reality? We're here to make it happen. 
            Drop us a line and let's start building the future together.
          </p>

          <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="contact__input" 
                ref={addToInputsRef}
                required
              />
              <span className="contact__input-line"></span>
            </div>

            <div className="contact__form-group">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="contact__input" 
                ref={addToInputsRef}
                required
              />
              <span className="contact__input-line"></span>
            </div>

            <div className="contact__form-group">
              <textarea 
                placeholder="Tell us about your project..." 
                className="contact__textarea" 
                ref={addToInputsRef}
                rows="4"
                required
              ></textarea>
              <span className="contact__input-line"></span>
            </div>

            <button 
              type="submit" 
              className="contact__button" 
              ref={buttonRef}
              disabled={isSubmitting}
            >
              <span className="contact__button-text">
                {isSubmitting ? 'Sending Magic...' : 'Send Message'}
              </span>
              <span className="contact__button-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;