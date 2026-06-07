import React, { useState, useRef, useEffect } from 'react';
import './font-specimen.css';

const FontSpecimen = ({ font }) => {
  // Build style options from the font's stylesList (fallback to a basic set)
  const fontStyles = font?.stylesList || [
    { name: 'Regular', weight: 400, italic: false },
    { name: 'Bold', weight: 700, italic: false },
  ];

  const [selectedStyleIndex, setSelectedStyleIndex] = useState(
    // Default to the heaviest non-italic style for impact
    () => {
      const blackIdx = fontStyles.findIndex(s => s.weight >= 900 && !s.italic);
      const boldIdx = fontStyles.findIndex(s => s.weight >= 700 && !s.italic);
      return blackIdx >= 0 ? blackIdx : boldIdx >= 0 ? boldIdx : 0;
    }
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [textCase, setTextCase] = useState('mixed'); // 'mixed' | 'upper'
  const [textAlign, setTextAlign] = useState('center'); // 'left' | 'center' | 'right' | 'justify'
  const [fontSize, setFontSize] = useState(96);
  const [lineHeight, setLineHeight] = useState(1.1);
  const [tracking, setTracking] = useState(-0.02);

  const dropdownRef = useRef(null);

  const selectedStyle = fontStyles[selectedStyleIndex];

  const specimenText = textCase === 'upper'
    ? 'BUILDING YOUR CLIMBING SKILLS: THE PATH TO EVEREST'
    : 'Building your climbing skills: The Path to Everest';

  const handleStyleSelect = (index) => {
    setSelectedStyleIndex(index);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <section
      className="font-specimen-section"
      id="specimen"
    >
      <div className="font-specimen-container">
        {/* Title */}
        <h2 className="specimen-title">Specimen</h2>

        {/* Controls Area */}
        <div className="specimen-controls-area">
          {/* Row 1: Dropdown + Toggles */}
          <div className="specimen-controls-row">
            {/* Font Style Dropdown */}
            <div className="specimen-dropdown" ref={dropdownRef}>
              <button
                className="fchc-dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="dropdown-label">
                  {font?.name || 'Font'} {selectedStyle.name}
                </span>
                <svg
                  className={`dropdown-chevron ${dropdownOpen ? 'is-open' : ''}`}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="specimen-dropdown-menu">
                  {fontStyles.map((style, idx) => (
                    <button
                      key={idx}
                      className={`specimen-dropdown-item ${idx === selectedStyleIndex ? 'is-selected' : ''}`}
                      onClick={() => handleStyleSelect(idx)}
                      style={{
                        fontWeight: style.weight,
                        fontStyle: style.italic ? 'italic' : 'normal',
                      }}
                    >
                      {style.name}
                      <span className="dropdown-item-weight">{style.weight}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Case + Alignment Toggles */}
            <div className="specimen-toggles">
              {/* Case toggle */}
              <div className="toggle-group">
                <button
                  className={`toggle-btn-specimen ${textCase === 'mixed' ? 'is-active' : ''}`}
                  onClick={() => setTextCase('mixed')}
                  title="Mixed case"
                >
                  Aa
                </button>
                <button
                  className={`toggle-btn-specimen ${textCase === 'upper' ? 'is-active' : ''}`}
                  onClick={() => setTextCase('upper')}
                  title="Uppercase"
                >
                  AA
                </button>
              </div>

              {/* Alignment toggle */}
              <div className="toggle-group">
                <button
                  className={`toggle-btn-specimen ${textAlign === 'left' ? 'is-active' : ''}`}
                  onClick={() => setTextAlign('left')}
                  title="Align left"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="15" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className={`toggle-btn-specimen ${textAlign === 'center' ? 'is-active' : ''}`}
                  onClick={() => setTextAlign('center')}
                  title="Align center"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="5" y1="15" x2="11" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className={`toggle-btn-specimen ${textAlign === 'right' ? 'is-active' : ''}`}
                  onClick={() => setTextAlign('right')}
                  title="Align right"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="8" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className={`toggle-btn-specimen ${textAlign === 'justify' ? 'is-active' : ''}`}
                  onClick={() => setTextAlign('justify')}
                  title="Justify"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="2" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Sliders */}
          <div className="specimen-sliders-row">
            <div className="fchc-slider-group">
              <label className="fchc-slider-label">Size</label>
              <div className="fchc-slider-track-wrap">
                <input
                  type="range"
                  className="fchc-slider-input"
                  min="24"
                  max="200"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="fchc-slider-group">
              <label className="fchc-slider-label">Leading</label>
              <div className="fchc-slider-track-wrap">
                <input
                  type="range"
                  className="fchc-slider-input"
                  min="0.8"
                  max="2"
                  step="0.05"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="fchc-slider-group">
              <label className="fchc-slider-label">Tracking</label>
              <div className="fchc-slider-track-wrap">
                <input
                  type="range"
                  className="fchc-slider-input"
                  min="-0.1"
                  max="0.3"
                  step="0.005"
                  value={tracking}
                  onChange={(e) => setTracking(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specimen Preview */}
        <div
          className="specimen-preview"
          style={{
            fontFamily: font?.googleFont || 'inherit',
            fontWeight: selectedStyle.weight,
            fontStyle: selectedStyle.italic ? 'italic' : 'normal',
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            letterSpacing: `${tracking}em`,
            textAlign: textAlign,
          }}
        >
          {specimenText}
        </div>
      </div>
    </section>
  );
};

export default FontSpecimen;
