import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { CaretLeft, CaretRight } from 'phosphor-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className='hero__car1'>
          {/* Contenido principal con imagen y texto */}
          <div className="hero__main-content">
            <div className="hero__text-content">
              <p className='hero__car1-title'>Ferrari 288 GTO</p>
              <p className='hero__car1-description'>
                Unveiled in 1984, stands as one of the brand's most iconic models. 
                Originally designed for Group B homologation, it blends elegance with 
                aggressive styling, borrowing the silhouette of the 308 but with a more 
                muscular presence. Power comes from a twin-turbo 2.8-liter V8 producing 
                over 400 horsepower, pushing the car to a top speed of around 305 km/h—remarkable 
                figures for its time. Today, the 288 GTO is celebrated as a cult classic, 
                marking the beginning of Ferrari's modern supercar era.
              </p>
            </div>
            
            <div className="hero__main-image">
              <img src="/images/car1.png" alt="Ferrari 288 GTO main view" />
            </div>
          </div>

          {/* Galería de imágenes con controles */}
          <div className="hero__gallery">
            <CaretLeft size={55} color='black' className="hero__gallery-arrow hero__gallery-arrow--left" />
            
            <div className="hero__gallery-images">
              <img src="/images/car1view2.png" alt="Ferrari 288 GTO view 2" className="hero__gallery-image" />
              <img src="/images/car1view1.png" alt="Ferrari 288 GTO view 1" className="hero__gallery-image" />
              <img src="/images/car1view3.png" alt="Ferrari 288 GTO view 3" className="hero__gallery-image" />
            </div>
            
            <CaretRight size={55} color='black' className="hero__gallery-arrow hero__gallery-arrow--right" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;