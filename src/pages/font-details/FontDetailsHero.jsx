import React from 'react';
import './font-details.css';

const FontDetailsHero = ({ font }) => {
  const backgroundImageUrl = "/images/hero-bg.jpg";

  return (
    <section className="font-details-hero" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 
          className="hero-font-name" 
          style={{ fontFamily: font?.googleFont || 'inherit', fontSize: '140px', color: '#ffffff' }}
        >
          {font?.name || 'Font Name'}
        </h1>
        <p className="hero-font-about">{font?.description || ''}</p>
        
        <div className="hero-specs-container">
          <div className="hero-spec-item">
            <span className="hero-spec-label">Weights & Styles</span>
            <span className="hero-spec-value">{font?.weightsAndStyles}</span>
          </div>
          <div className="hero-spec-item">
            <span className="hero-spec-label">Language Support</span>
            <span className="hero-spec-value">{font?.languageSupport}</span>
          </div>
          <div className="hero-spec-item">
            <span className="hero-spec-label">Release Year</span>
            <span className="hero-spec-value">{font?.releaseYear}</span>
          </div>
        </div>
      </div>
      
      <div className="hero-bottom-nav-container">
        <nav className="hero-pill-nav">
          <a href="#styles" className="nav-item">Styles</a>
          <a href="#specimen" className="nav-item">Specimen</a>
          <a href="#information" className="nav-item">Information</a>
          <a href="#designers" className="nav-item">Designers</a>
          <a href="#glyphs" className="nav-item">Glyphs</a>
          <a href="#opentype" className="nav-item">OpenType</a>
          <button className="add-to-cart-btn">Download</button>
        </nav>
      </div>
    </section>
  );
};

export default FontDetailsHero;
