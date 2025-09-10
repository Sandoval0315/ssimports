import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Welcome to SS Imports</h1>
        <p className="hero__subtitle">Your gateway to quality products</p>
      </div>
    </section>
  );
}

export default Hero;