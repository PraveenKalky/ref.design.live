import React from 'react';
import './font-details.css';

const FontDetailsHero = ({ font }) => {
  const backgroundImageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop";

  return (
    <section className="font-details-hero" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      {/* Semi-transparent overlay to ensure text remains legible */}
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 
          className="hero-font-name" 
          style={{ fontFamily: font?.googleFont || 'inherit' }}
        >
          {font?.name || 'Font Name'}
        </h1>
      </div>
      
      <div className="hero-bottom-nav-container">
        <nav className="hero-pill-nav">
          <a href="#styles" className="nav-item">Styles</a>
          <a href="#specimen" className="nav-item">Specimen</a>
          <a href="#information" className="nav-item">Information</a>
          <a href="#designers" className="nav-item">Designers</a>
          <a href="#glyphs" className="nav-item">Glyphs</a>
          <a href="#opentype" className="nav-item">OpenType</a>
          <button className="add-to-cart-btn">Add to cart</button>
        </nav>
      </div>
    </section>
  );
};

export default FontDetailsHero;
