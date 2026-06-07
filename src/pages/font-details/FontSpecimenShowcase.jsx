import React, { useState, useRef, useEffect } from 'react';
import './font-specimen-showcase.css';

const ShowcaseColumn = ({ font, defaultStyleName, defaultText, defaultFontSize, defaultCase, defaultAlign, isHeadline }) => {
  const fontStyles = font?.stylesList || [
    { name: 'Regular', weight: 400, italic: false },
    { name: 'Bold', weight: 700, italic: false },
  ];

  // Find index of the default style
  const defaultIdx = fontStyles.findIndex(s => s.name.toLowerCase().includes(defaultStyleName.toLowerCase()));
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(defaultIdx >= 0 ? defaultIdx : 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [textCase, setTextCase] = useState(defaultCase || 'mixed');
  const [textAlign, setTextAlign] = useState(defaultAlign || 'left');
  const [fontSize, setFontSize] = useState(defaultFontSize || 18);
  const [lineHeight, setLineHeight] = useState(isHeadline ? 1.05 : 1.4);
  const [tracking, setTracking] = useState(isHeadline ? -0.02 : 0);

  const dropdownRef = useRef(null);
  const selectedStyle = fontStyles[selectedStyleIndex];

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

  // Format text depending on case setting
  const getFormattedText = (txt) => {
    if (textCase === 'upper') {
      return txt.toUpperCase();
    }
    return txt;
  };

  return (
    <div className="showcase-column">
      {/* Controls Area */}
      <div className="showcase-controls-area">
        {/* Row 1: Dropdown + Toggles */}
        <div className="showcase-controls-row">
          {/* Dropdown */}
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
                    onClick={() => {
                      setSelectedStyleIndex(idx);
                      setDropdownOpen(false);
                    }}
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

          {/* Toggles */}
          <div className="specimen-toggles">
            {/* Case */}
            <div className="toggle-group">
              <button
                className={`toggle-btn-specimen ${textCase === 'mixed' ? 'is-active' : ''}`}
                onClick={() => setTextCase('mixed')}
              >
                Aa
              </button>
              <button
                className={`toggle-btn-specimen ${textCase === 'upper' ? 'is-active' : ''}`}
                onClick={() => setTextCase('upper')}
              >
                AA
              </button>
            </div>

            {/* Alignment */}
            <div className="toggle-group">
              <button
                className={`toggle-btn-specimen ${textAlign === 'left' ? 'is-active' : ''}`}
                onClick={() => setTextAlign('left')}
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
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Sliders (revealed on hover) */}
        <div className="showcase-sliders-row">
          <div className="fchc-slider-group">
            <label className="fchc-slider-label">Size</label>
            <div className="fchc-slider-track-wrap">
              <input
                type="range"
                className="fchc-slider-input"
                min={isHeadline ? "32" : "12"}
                max={isHeadline ? "140" : "40"}
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
                max="2.2"
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

      {/* Content Preview */}
      <div 
        className="showcase-content-preview"
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
        {isHeadline ? (
          <div className="headline-layout">
            <h1 className="headline-text-large">{getFormattedText(defaultText.headline)}</h1>
            <div className="headline-numeric-line">{getFormattedText(defaultText.numbers)}</div>
            <div className="headline-sub-line">{getFormattedText(defaultText.sub)}</div>
          </div>
        ) : (
          <p className="paragraph-text-block">{getFormattedText(defaultText)}</p>
        )}
      </div>
    </div>
  );
};

const FontSpecimenShowcase = ({ font }) => {
  const leftColText = "The day unfolds as I move through forests of Canary Pine, subtropical birch forests, sandy arid desert and the rocky volcanic centre. During this time I appreciate the camaraderie of fellow runners that switches from silent companionship interspersed with sporadic friendly conversation. A pleasant distraction from the inevitable physical pain and fatigue that builds. Time passes. 19 hours 6 minutes and 59 seconds later the finish line awaits.";

  const middleColText = {
    headline: "MANASLU EXPEDITION",
    numbers: "↗ 8,163m ↖",
    sub: "(26,781 ft)"
  };

  const rightColText = "There's something delicious about running through the night in the early hours. The rest of the world could be on another planet. Daily life slips away, work commitments, ongoing house renovations, social media, expectations, assumptions... Only the present moment exists. At the heart of it ultra-running is so simple. One foot in front of another. And yet traversing such distances often lies beyond my comprehension. The enormity of it all. It's almost impossible for my mental brain to fathom.";

  return (
    <section className="font-specimen-showcase-section" id="specimen-showcase">
      <div className="font-specimen-showcase-container">
        <div className="showcase-grid">
          {/* Column 1: Left */}
          <ShowcaseColumn 
            font={font}
            defaultStyleName="Bold"
            defaultText={leftColText}
            defaultFontSize={22}
            defaultCase="mixed"
            defaultAlign="left"
            isHeadline={false}
          />

          {/* Column 2: Middle */}
          <ShowcaseColumn 
            font={font}
            defaultStyleName="Black"
            defaultText={middleColText}
            defaultFontSize={64}
            defaultCase="upper"
            defaultAlign="center"
            isHeadline={true}
          />

          {/* Column 3: Right */}
          <ShowcaseColumn 
            font={font}
            defaultStyleName="Light"
            defaultText={rightColText}
            defaultFontSize={22}
            defaultCase="mixed"
            defaultAlign="left"
            isHeadline={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FontSpecimenShowcase;
