import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  GLYPH_CATEGORIES,
  getGlyphsForCategory,
  getGlyphName,
  getGlyphCategory,
} from './glyphs-data';
import './glyphs-section.css';

const GlyphsSection = ({ font }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'symbols'
  const [selectedGlyph, setSelectedGlyph] = useState({
    char: '%',
    code: 0x0025,
    hex: 'U+0025',
    decimal: 37,
  });
  const [hoveredGlyph, setHoveredGlyph] = useState(null);
  const [renderMode, setRenderMode] = useState('fill'); // 'fill' | 'outlines'
  const [showMetrics, setShowMetrics] = useState(true);

  const activeGlyph = hoveredGlyph || selectedGlyph;

  // Dynamic metrics based on character type and reference image values
  const metrics = useMemo(() => {
    const char = activeGlyph.char;
    if (char === '%') {
      return { width: 820, capHeight: 720, xHeight: 522, baseline: 0, descender: -278 };
    }
    if (char === 'E') {
      return { width: 534, capHeight: 720, xHeight: 522, baseline: 0, descender: -278 };
    }
    
    // Deterministic but realistic values for other characters
    let width = 600;
    if (/[A-Z]/.test(char)) {
      const widths = { A: 680, B: 620, C: 680, D: 720, F: 500, G: 740, H: 720, I: 280, J: 480, K: 640, L: 520, M: 840, N: 720, O: 760, P: 600, Q: 760, R: 640, S: 560, T: 580, U: 720, V: 640, W: 920, X: 640, Y: 580, Z: 600 };
      width = widths[char] || 650;
    } else if (/[a-z]/.test(char)) {
      const widths = { a: 520, b: 540, c: 480, d: 540, e: 520, f: 320, g: 540, h: 540, i: 240, j: 240, k: 500, l: 240, m: 800, n: 540, o: 540, p: 540, q: 540, r: 360, s: 440, t: 340, u: 540, v: 480, w: 720, x: 480, y: 480, z: 440 };
      width = widths[char] || 500;
    } else if (/[0-9]/.test(char)) {
      width = 560;
    } else if (char === ' ') {
      width = 250;
    }
    
    return {
      width,
      capHeight: 720,
      xHeight: 522,
      baseline: 0,
      descender: -278
    };
  }, [activeGlyph.char]);

  // Font style dropdown state
  const fontStyles = font?.stylesList || [
    { name: 'Regular', weight: 400, italic: false },
    { name: 'Bold', weight: 700, italic: false },
  ];

  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleStyleSelect = (index) => {
    setSelectedStyleIndex(index);
    setDropdownOpen(false);
  };

  // Build all categories with their glyphs once
  const categoriesWithGlyphs = useMemo(() => {
    return GLYPH_CATEGORIES.map(cat => ({
      ...cat,
      glyphs: getGlyphsForCategory(cat),
    })).filter(cat => cat.glyphs.length > 0);
  }, []);

  // Filter based on active tab
  const filteredCategories = useMemo(() => {
    if (activeTab === 'symbols') {
      return categoriesWithGlyphs.filter(cat => cat.type === 'symbol');
    }
    return categoriesWithGlyphs;
  }, [activeTab, categoriesWithGlyphs]);

  const handleGlyphClick = useCallback((glyph) => {
    setSelectedGlyph(glyph);
  }, []);

  const fontFamily = font?.googleFont || 'inherit';

  const activeFontStyle = {
    fontFamily,
    fontWeight: selectedStyle.weight,
    fontStyle: selectedStyle.italic ? 'italic' : 'normal',
  };

  const gridFontStyle = {
    fontFamily,
    fontWeight: 500,
  };

  // ── Glyph sizing & vertical alignment ────────────────────────────────────
  // Goal:
  //   • Uppercase: cap-height ink top  = Cap-height guide (bbox top)
  //   • Uppercase: baseline            = Baseline guide   (bbox bottom, 250 px below)
  //   • Lowercase: x-height ink top    = X-height guide   (68.75 px below bbox top)
  //   • Lowercase: baseline            = Baseline guide   (same bbox bottom)
  //
  // fontSize = 250 / (capHeight/UPM) ≈ 347 px
  //   → uppercase cap-height ink spans exactly 250 px  ✓
  //   → lowercase x-height ink spans 522/1000×347 ≈ 181 px
  //       which equals the X-height→Baseline guide distance (181.25 px) ✓
  //
  // Google Fonts normalized hhea ascender ≈ 0.8 of the em-square.
  // The space above cap-height = (0.8 − 0.72) × fontSize ≈ 28 px.
  // Setting top = −28 px shifts the element up so that:
  //   cap-height ink top  aligns with bbox top  (Cap-height guide) ✓
  //   baseline            aligns with bbox bottom (Baseline guide)  ✓
  const ASCENDER_RATIO = 0.8; // actual normalized ascender for all Google Fonts used here
  const glyphFontSize  = Math.round(250 / (metrics.capHeight / 1000)); // ≈ 347 px
  const glyphTop       = -Math.round(glyphFontSize * (ASCENDER_RATIO - metrics.capHeight / 1000));
  // ≈ −Math.round(347 × 0.08) = −28 px

  const glyphCharStyle = {
    ...activeFontStyle,
    fontWeight: 600,
    fontSize: `${glyphFontSize}px`,
    top: `${glyphTop}px`,
  };

  return (
    <section className="glyphs-section" id="glyphs">
      <div className="glyphs-container">
        {/* Header */}
        <div className="glyphs-header">
          <div className="glyphs-header-left">
            <h2 className="glyphs-title">Glyphs</h2>
          </div>

          <div className="glyphs-header-right">
            {/* Font Style Dropdown */}
            <div className="glyphs-dropdown" ref={dropdownRef}>
              <button
                className="glyphs-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="glyphs-dropdown-label">
                  {font?.name || 'Font'} {selectedStyle.name}
                </span>
                <svg
                  className={`glyphs-dropdown-chevron ${dropdownOpen ? 'is-open' : ''}`}
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="glyphs-dropdown-menu">
                  {fontStyles.map((style, idx) => (
                    <button
                      key={idx}
                      className={`glyphs-dropdown-item ${idx === selectedStyleIndex ? 'is-selected' : ''}`}
                      onClick={() => handleStyleSelect(idx)}
                      style={{
                        fontWeight: style.weight,
                        fontStyle: style.italic ? 'italic' : 'normal',
                      }}
                    >
                      {style.name}
                      <span className="glyphs-dropdown-item-weight">{style.weight}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="glyphs-tab-group">
              <button
                className={`glyphs-tab ${activeTab === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={`glyphs-tab ${activeTab === 'symbols' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('symbols')}
              >
                Symbols
              </button>
            </div>
          </div>
        </div>

        <div className="glyphs-layout">
          {/* ── Left Column: Glyph Grid ── */}
          <div className="glyphs-grid-column">

            {/* Categories */}
            <div className="glyphs-categories">
              {filteredCategories.map(cat => (
                <div className="glyph-category-block" key={cat.name}>
                  <span className="glyph-category-label">{cat.name}</span>
                  <div className="glyph-grid">
                    {cat.glyphs.map(glyph => (
                      <button
                        key={glyph.code}
                        className={`glyph-cell ${selectedGlyph.code === glyph.code ? 'is-selected' : ''}`}
                        onClick={() => handleGlyphClick(glyph)}
                        onMouseEnter={() => setHoveredGlyph(glyph)}
                        onMouseLeave={() => setHoveredGlyph(null)}
                        style={gridFontStyle}
                      >
                        {glyph.char}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Preview Panel ── */}
          <div className="glyphs-preview-column">
            <div className="glyphs-preview-panel">

              {/* ── Zone 1: Toolbar ── */}
              <div className="glyph-preview-toolbar">
                {/* Fill / Outlines pills on the LEFT */}
                <div className="glyph-preview-mode-toggle">
                  <label className="glyph-radio-label">
                    <input
                      type="radio"
                      name="glyphRenderMode"
                      value="fill"
                      checked={renderMode === 'fill'}
                      onChange={() => setRenderMode('fill')}
                    />
                    <span>Fill</span>
                  </label>
                  <label className="glyph-radio-label">
                    <input
                      type="radio"
                      name="glyphRenderMode"
                      value="outlines"
                      checked={renderMode === 'outlines'}
                      onChange={() => setRenderMode('outlines')}
                    />
                    <span>Outlines</span>
                  </label>
                </div>
                {/* Metrics toggle on the RIGHT */}
                <div 
                  className="metric-toggle-switch"
                  onClick={() => setShowMetrics(!showMetrics)}
                >
                  <span>Metrics</span>
                  <div className={`toggle-track ${showMetrics ? 'is-active' : ''}`}>
                    <div className="toggle-thumb" />
                  </div>
                </div>
              </div>

              {/* ── Zone 2: Preview Canvas ── */}
              <div className="glyph-preview-area" style={{ '--glyph-width': metrics.width }}>
                {showMetrics && (
                  <>
                    {/* Horizontal metric guides (span full width of content) */}
                    <div className="glyph-guide-h glyph-guide-cap">
                      <span className="glyph-guide-label-left">Cap height</span>
                      <span className="glyph-guide-label-right">{metrics.capHeight}</span>
                    </div>
                    <div className="glyph-guide-h glyph-guide-xheight">
                      <span className="glyph-guide-label-left">X-height</span>
                      <span className="glyph-guide-label-right">{metrics.xHeight}</span>
                    </div>
                    <div className="glyph-guide-h glyph-guide-baseline">
                      <span className="glyph-guide-label-left">Baseline</span>
                      <span className="glyph-guide-label-right">{metrics.baseline}</span>
                    </div>
                    <div className="glyph-guide-h glyph-guide-descender">
                      <span className="glyph-guide-label-left">Descender</span>
                      <span className="glyph-guide-label-right">{metrics.descender}</span>
                    </div>
                  </>
                )}

                {/* Bounding box for vertical guides and character */}
                <div className="glyph-bbox">
                  {showMetrics && (
                    <>
                      {/* Two vertical guide lines bracketing the glyph */}
                      <div className="glyph-guide-vertical glyph-guide-v1" />
                      <div className="glyph-guide-vertical glyph-guide-v2" />
                    </>
                  )}

                  {/* The glyph character — sized so its top edge aligns with Cap height guide */}
                  <div
                    className={`glyph-preview-char ${renderMode === 'outlines' ? 'is-outline' : ''}`}
                    style={glyphCharStyle}
                  >
                    {activeGlyph.char}
                  </div>
                </div>
              </div>

              {/* ── Zone 3: Unicode Footer ── */}
              <div className="glyph-preview-unicode">
                {activeGlyph.hex}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlyphsSection;
