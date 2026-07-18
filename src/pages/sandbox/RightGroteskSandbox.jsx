import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import './RightGroteskSandbox.css';
import '../font-details/font-details.css'; // Re-use the carousel styles

const RightGroteskSandbox = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollByCard = (direction) => {
    if (trackRef.current) {
      const cardWidth = 948;
      const gap = 40; 
      const scrollAmount = cardWidth + gap;
      
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const images = [
    { src: '/images/specimens/right-grotesk-font-family-1.webp', alt: 'Condensed headline specimen' },
    { src: '/images/specimens/right-grotesk-font-family-2.webp', alt: 'Multilingual specimen' },
    { src: '/images/specimens/right-grotesk-font-family-3.webp', alt: 'Weight & style matrix' },
    { src: '/images/specimens/right-grotesk-font-family-4.webp', alt: 'Many Bigger Things specimen' },
    { src: '/images/specimens/right-grotesk-font-family.webp', alt: 'Right Grotesk overview specimen' }
  ];

  return (
    <div className="rg-sandbox-wrapper" style={{ paddingBottom: '100px', background: '#fff' }}>
      
      <div style={{ textAlign: 'center', padding: '40px', background: '#000', color: '#fff', marginBottom: '40px' }}>
        <h2>SANDBOX PREVIEW: Updated Right Grotesk Hero Carousel</h2>
        <p>This is a sandbox testing the official image specimens instead of the HTML slides.</p>
      </div>

      <section className="font-details-hero carousel-layout" style={{ minHeight: 'auto', padding: '40px 0' }}>
        <div className="carousel-viewport">
          <div 
            className="carousel-track" 
            ref={trackRef} 
            onScroll={checkScroll}
          >
            {images.map((img, idx) => (
              <div key={idx} className="carousel-slide" style={{ padding: 0 }}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
            ))}
          </div>

          <button 
            className={`carousel-nav-btn prev ${!canScrollLeft ? 'disabled' : ''}`} 
            onClick={() => scrollByCard('left')}
            aria-label="Previous Slide"
          >
            <ArrowLeft size={24} weight="regular" color="#111" />
          </button>
          
          <button 
            className={`carousel-nav-btn next ${!canScrollRight ? 'disabled' : ''}`} 
            onClick={() => scrollByCard('right')}
            aria-label="Next Slide"
          >
            <ArrowRight size={24} weight="regular" color="#111" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default RightGroteskSandbox;
