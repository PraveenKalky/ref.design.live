import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './NotFound.css';

const originalPositions = [
  // First 4 (17 elements)
  [19, 18], [15, 25], [12, 32], [8, 39], [4, 47], [1, 55], [-2, 62], [5, 62], [12, 62], [19, 62], [25.5, 62], [19, 27], [19, 35.5], [19, 43.5], [19, 53], [19, 70], [19, 79],
  // 0 (18 elements)
  [41, 20], [38, 26], [36, 34], [35, 43], [35, 52], [35.5, 61], [37, 69], [41, 76], [47, 79], [52, 76], [55.5, 69], [57, 61], [58, 52], [58, 43], [57, 34], [55, 26], [52, 20], [47, 18],
  // Second 4 (17 elements)
  [88, 18], [84, 25], [81, 32], [77, 39], [73, 47], [70, 55], [67, 62], [74, 62], [81, 62], [88, 62], [94.5, 62], [88, 27], [88, 35.5], [88, 43.5], [88, 53], [88, 70], [88, 79]
];

// Uniformly scale by 15% from the center (X: 46.25, Y: 48.5) to increase spacing evenly
const positions = originalPositions.map(p => [
  46.25 + (p[0] - 46.25) * 1.15,
  48.5 + (p[1] - 48.5) * 1.15
]);

// High quality curated project assets
const projectAssets = [
  '/404-images/ui_design_1_1782642620259.png',
  '/404-images/ui_design_2_1782642631521.png',
  '/404-images/ui_design_3_1782642641505.png',
  '/404-images/ui_design_4_1782642653005.png',
  '/404-images/ecommerce-thumb.png',
  '/404-images/fintech-thumb.png',
  '/404-images/hero-preview.png',
];

// Helper to convert HSL to Hex
const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return "#" + [f(0), f(8), f(4)].map(x => Math.round(255 * x).toString(16).padStart(2, "0")).join("");
};

// The horizontal offset that centers the entire 404 composition in its container
const COMPOSITION_OFFSET = 'translateX(13.9%)';

const NotFound = () => {
  const [sliderVal, setSliderVal] = useState(36);
  const [showBg404, setShowBg404] = useState(false);
  const collageRef = useRef(null);
  const cardsRef = useRef([]);
  const nav = useNavigate();
  const hideTimeoutRef = useRef(null);

  // Assign assets cycling through the pool for variety
  const [cardAssets] = useState(() =>
    positions.map((_, i) => projectAssets[i % projectAssets.length])
  );

  const baseHue = Math.round((sliderVal / 100) * 360);
  const currentHex = hslToHex(baseHue, 100, 50);

  // Temporary grey 404 behavior on slider movement
  useEffect(() => {
    setShowBg404(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setShowBg404(false);
    }, 300);
    return () => clearTimeout(hideTimeoutRef.current);
  }, [sliderVal]);

  // Parallax mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const collage = collageRef.current;
      if (!collage) return;
      const rect = collage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Select all card anchors directly to ensure no tile is ever skipped
      const cards = collage.querySelectorAll('.notfound-card-anchor');
      cards.forEach((card) => {
        // Use a single uniform depth so all tiles move together as one unified interactive object
        card.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
      });

      // Apply exact same parallax to the grey SVG layer so they remain aligned
      const svg = collage.querySelector('.notfound-grey-svg-layer');
      if (svg) {
        svg.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="notfound-page">
      <main className="notfound-main">
        <section className="notfound-message">
          <h1>Whoops, that page is gone.</h1>
          <p>
            While you're here, feast your eyes upon these tantalizing popular designs matching the color{' '}
            <span
              className="notfound-color-choice"
              style={{ color: `hsl(${baseHue}, 100%, 50%)`, transition: 'color 0.15s ease' }}
            >
              {currentHex}
            </span>.
          </p>
        </section>

        {/* Collage */}
        <section className="notfound-collage" ref={collageRef}>

          {/*
            Both layers use the EXACT SAME layout system:
            - Same parent wrapper with same transform
            - Same positions array
            - Same card size (5.2% width, 4.06% height)
            This guarantees pixel-perfect size/position match.
          */}
          <div className="notfound-composition-wrapper" style={{ transform: COMPOSITION_OFFSET }}>

            {/* Grey 404 SVG layer — matches exact image tiles positions and dimensions */}
            <svg
              className="notfound-grey-svg-layer"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
                opacity: showBg404 ? 1 : 0,
                transition: showBg404
                  ? 'opacity 0.05s ease-out'
                  : 'opacity 0.2s ease-out',
                zIndex: 2,
              }}
            >
              {positions.map((p, idx) => (
                <rect
                  key={idx}
                  x={p[0]}
                  y={p[1]}
                  width={5.2}
                  height={8.53125}
                  fill="var(--dv-text, #ffffff)"
                  opacity={0.15}
                />
              ))}
            </svg>

            {/* Image tile layer — same positions, same wrapper */}
            <div
              className="notfound-collage-images"
              style={{
                opacity: showBg404 ? 0 : 1,
                transition: showBg404
                  ? 'opacity 0.1s ease-out'
                  : 'opacity 0.2s ease-out',
                pointerEvents: showBg404 ? 'none' : 'auto',
              }}
            >
              {positions.map((p, idx) => {
                const cardHue = (baseHue + (idx % 10) * 5) % 360;
                const rotation = idx % 2 === 0 ? '4deg' : '-4deg';

                return (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="notfound-card-anchor"
                    ref={el => cardsRef.current[idx] = el}
                    style={{
                      left: `${p[0]}%`,
                      top: `${p[1]}%`,
                      color: `hsla(${cardHue}, 100%, 45%, 0.38)`,
                      '--i': idx,
                      '--r': rotation,
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <img
                        src={cardAssets[idx]}
                        className="notfound-card-img"
                        alt={`UI Design ${idx + 1}`}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: `hsl(${cardHue}, 100%, 50%)`,
                          mixBlendMode: 'color',
                          opacity: 0.35,
                          borderRadius: 0,
                          pointerEvents: 'none',
                          transition: 'background-color 0.15s ease',
                        }}
                      />
                    </div>
                  </a>
                );
              })}
            </div>

          </div>
        </section>


        {/* Color Slider */}
        <div className="notfound-slider-container">
          <input
            className="notfound-color-range"
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            style={{ color: `hsl(${baseHue}, 100%, 50%)` }}
            title="Drag to change colors"
          />
        </div>

        {/* CTA Buttons */}
        <div className="notfound-cta-container">
          <button onClick={() => nav('/')} className="notfound-back-home">
            <ArrowLeft size={16} />
            Back to home
          </button>
          <button onClick={() => window.open('https://t.me/praveenequicom', '_blank')} className="notfound-telegram">
            Telegram Me
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
