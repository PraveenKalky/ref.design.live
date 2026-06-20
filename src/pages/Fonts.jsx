import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, ChevronUp, X, Type, RotateCcw, LayoutGrid, Menu, Maximize2, MoveHorizontal } from 'lucide-react';
import { DownloadSimple, BookmarkSimple } from '@phosphor-icons/react';
import Pagination from '../components/pagination/Pagination';
import LoginModal from '../components/navbar/LoginModal';
import '../components/filter-bar/filter-bar.css';
import '../components/filters/category-filter-expanded.css';
import './Fonts.css';
import { useNavigate } from 'react-router-dom';
import { FONT_CATEGORY_COUNTS, initialFontsData } from '../data/fontsData';
import { useFonts } from '../hooks/useFonts';
import { useSavedFonts } from '../hooks/useSavedFonts';

const getShortDescription = (fontName) => {
  const descriptions = {
    "Neue Montreal": "The only Grotesk you'll ever need.",
    "PP Fragment": "Classic serifs with a contemporary twist.",
    "Right Grotesk": "Neutral, but not boring.",
    "Mori": "A versatile gothic sans-serif.",
    "Pangram Sans": "A comprehensive geometric sans-serif workhorse.",
    "Formula": "A bold, flexible grotesk for maximum impact.",
    "Editorial New": "Precise, narrow serif for fashion and headlines.",
    "Telegraph": "A sturdy, functional sans-serif for branding."
  };
  const baseName = fontName.replace(/\s\d+$/, '');
  return descriptions[baseName] || descriptions[fontName] || "A premium high-quality typeface.";
};

const SPECIMEN_PHRASES = [
  "Schoolbookish",
  "Urogravimeter",
  "Defenselessly",
  "The quick brown fox",
  "Neutral forms",
  "Modern grotesk",
  "Sharp rhythm"
];
const PREVIEW_COLORS = [
  { id: 'black',  value: '#111111', border: 'transparent' },
  { id: 'white',  value: '#ffffff', border: '#d0d0d0' },
  { id: 'orange', value: '#e03d2f', border: 'transparent' },
  { id: 'yellow', value: '#f5a623', border: 'transparent' },
];


const FontCard = ({ font, globalText, globalFontSize, viewMode, savedIds, toggleSave, openLogin }) => {
  const [fontSize, setFontSize] = useState(globalFontSize || 120);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [autoFontSize, setAutoFontSize] = useState(null);
  const [previewColor, setPreviewColor] = useState('#111111');
  const previewSpanRef = useRef(null);
  const previewContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (globalFontSize !== undefined) {
      setFontSize(globalFontSize);
    }
  }, [globalFontSize]);

  const isGrid = viewMode === 'grid';
  const textToShow = globalText && globalText.trim() !== '' 
    ? globalText 
    : SPECIMEN_PHRASES[font.id % SPECIMEN_PHRASES.length];

  // Start large and shrink until text fits the container width
  const MAX_SIZE = isGrid ? 48 : 180;
  const MIN_SIZE = isGrid ? 14 : 20;

  useEffect(() => {
    const span = previewSpanRef.current;
    const container = previewContainerRef.current;
    if (!span || !container) return;

    const fit = () => {
      // Force nowrap so width measurement is accurate
      span.style.whiteSpace = 'nowrap';
      span.style.lineHeight = '1';

      let size = MAX_SIZE;
      span.style.fontSize = size + 'px';

      // Shrink by 2px steps until both width AND height fit
      while (
        size > MIN_SIZE &&
        (span.scrollWidth > container.offsetWidth ||
         span.offsetHeight > container.offsetHeight)
      ) {
        size -= 2;
        span.style.fontSize = size + 'px';
      }
      // Fine-tune by 1px
      while (
        size > MIN_SIZE &&
        (span.scrollWidth > container.offsetWidth ||
         span.offsetHeight > container.offsetHeight)
      ) {
        size -= 1;
        span.style.fontSize = size + 'px';
      }

      setAutoFontSize(size);
    };

    // Initial fit
    fit();
    // Re-run after web fonts load (300ms grace)
    const timer = setTimeout(fit, 350);

    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textToShow, isGrid]);

  const handleCardClick = (e) => {
    // Prevent navigation if the user is interacting with sliders or buttons
    if (e.target.closest('.font-card-hover-controls') || e.target.closest('button')) {
      return;
    }
    navigate(`/fonts/${font.id}`);
  };

  return (
    <div className="font-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* ── ROW 1: Meta row — always visible, never moves ── */}
      <div className="font-card-top">
        <div className="card-top-left">
          <h3 className="font-card-name">{font.name}</h3>
          {font.badge && (
            <span className={`font-badge ${font.badge.toLowerCase()}`}>
              {font.badge}
            </span>
          )}
        </div>

        <div className="card-top-center">
          <p className="font-card-desc">{getShortDescription(font.name)}</p>
          {viewMode === 'list' && (
            <div className="fchc-bar">
              {/* 1. Style dropdown */}
              <div className="fchc-pill fchc-select">
                <span className="fchc-select-text">Cond Bold</span>
                <ChevronDown size={14} strokeWidth={2} />
              </div>

              {/* 2. Font size: icon + slider + value */}
              <div className="fchc-pill fchc-control">
                <Maximize2 size={15} strokeWidth={2} className="fchc-icon" />
                <input
                  type="range"
                  min="24"
                  max="200"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="fchc-slider"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="fchc-value">{fontSize}px</span>
              </div>

              {/* 3. Tracking: icon + slider + value */}
              <div className="fchc-pill fchc-control">
                <MoveHorizontal size={15} strokeWidth={2} className="fchc-icon" />
                <input
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.01"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="fchc-slider"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="fchc-value">{parseFloat(letterSpacing).toFixed(2)}em</span>
              </div>
            </div>
          )}
        </div>

        <div className="card-top-right">
          {/* Color swatches */}
          <div className="font-card-color-swatches" onClick={(e) => e.stopPropagation()}>
            {PREVIEW_COLORS.map((c) => (
              <button
                key={c.id}
                className={`color-swatch${previewColor === c.value ? ' color-swatch--active' : ''}`}
                style={{ background: c.value, border: `1.5px solid ${c.border}` }}
                onClick={(e) => { e.stopPropagation(); setPreviewColor(c.value); }}
                aria-label={`Preview color ${c.id}`}
                title={c.id}
              />
            ))}
          </div>
          <button className="font-card-action-btn">Download</button>
          <button
            className={`font-card-action-btn font-card-save-btn${savedIds?.[font.id] ? ' saved' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleSave?.(font.id); }}
            title={savedIds?.[font.id] ? 'Unsave' : 'Save'}
          >
            {savedIds?.[font.id] ? 'Saved ✓' : 'Save'}
          </button>
        </div>
      </div>

      {/* ── ROW 2: Preview area ── */}
      <div className="font-card-preview" ref={previewContainerRef}>
        <span
          className="preview-default"
          ref={previewSpanRef}
          style={{
            fontSize: autoFontSize ? `${autoFontSize}px` : `${MAX_SIZE}px`,
            fontFamily: font.googleFont,
            lineHeight: 1,
            color: previewColor,
          }}
        >
          {textToShow}
        </span>
        <span className="preview-hover" style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}em`, fontFamily: font.googleFont }}>
          {globalText && globalText.trim() !== '' ? globalText : "Six javelins thrown by the quick savages whizzed forty paces beyond the mark."}
        </span>
      </div>
    </div>
  );
};

// No massive dummy array needed in memory!
// We'll dynamically generate exactly the 32 cards needed per page.

const ITEMS_PER_PAGE = 32;

const PRESET_TEXTS = [
  "Almost before we know it, we had left the ground.",
  "The quick brown fox jumps over the lazy dog.",
  "When zombies arrive, quickly fax judge Pat.",
  "Crazy Fredericka bought many very exquisite opal jewels.",
  "Voix ambiguë d'un cœur qui au zéphyr préfère les jattes..."
];

const Fonts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const galleryRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ── Data from Supabase ──
  const { fonts: dbFonts, loading: fontsLoading } = useFonts();

  // ── Saved fonts (Supabase when logged in, localStorage when not) ──
  const { savedIds, savedCount, toggleSave } = useSavedFonts(() => setIsLoginOpen(true));

  const [activeTab, setActiveTab] = useState('popular');
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);;

  const [globalText, setGlobalText] = useState("");
  const [globalFontSize, setGlobalFontSize] = useState(64);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const removeCategoryChip = (cat) => {
    const el = document.getElementById(`font-chip-${cat}`);
    if (el) {
      el.classList.add('chip-exit');
      setTimeout(() => {
        setSelectedCategories(prev => prev.filter(c => c !== cat));
      }, 200);
    } else {
      toggleCategory(cat);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Use fonts from Supabase (or local fallback while loading)
  const fontsSource = dbFonts.length > 0 ? dbFonts : initialFontsData;

  // Dynamically compute only the cards for the current page
  const paginatedCards = Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => {
    const globalIndex = startIndex + i;
    const baseFont = fontsSource[globalIndex % fontsSource.length];
    return {
      ...baseFont,
      id: globalIndex + 1,
      name: globalIndex < fontsSource.length
        ? baseFont.name
        : `${baseFont.name} ${Math.floor(globalIndex / fontsSource.length) + 1}`
    };
  });

  return (
    <div className="fonts-page">
      <div className="fonts-page-wrapper">
        {/* ── HERO ── */}
        <section className="fonts-hero">
          <div className="fonts-hero-content">
            <h1 className="fonts-heading">
              <span className="dark-text">Every great design starts with <br /> the </span>
              <span className="purple-text">right font</span>
            </h1>
            <p className="fonts-subtext">
              Set your projects apart with exceptional typography. Explore our range of premium fonts,
              from statement text to subtle body copy; we have it all to capture the mood for your project.
            </p>
          </div>
        </section>
      </div>

      {/* ── HERO FILTER PATTERN ── */}
        <div className="filter-bar-container">
          <div className="filter-bar-content">
              <div className="filter-tabs">
                  <button 
                      className={`collapse-btn ${isExpanded ? 'active' : ''}`}
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? "Collapse" : "Expand"}
                  >
                      <ChevronDown size={16} strokeWidth={3} className="arrow-icon" />
                  </button>
                  <button 
                      className={`filter-tab ${activeTab === 'latest' ? 'active' : ''}`}
                      onClick={() => setActiveTab('latest')}
                  >
                      Latest
                  </button>
                  <button 
                      className={`filter-tab ${activeTab === 'popular' ? 'active' : ''}`}
                      onClick={() => setActiveTab('popular')}
                  >
                      Most popular
                  </button>
              </div>
              <div className="filter-actions">
                  <button className="filter-btn">
                      <span>Filter</span>
                  </button>
              </div>
          </div>
          
          <div className={`filter-categories-wrapper ${isExpanded ? 'expanded' : ''}`}>
              <div className="filter-categories-inner">
                <div className="category-filter-expanded">
                  {/* Row 2: Category Tags */}
                  <div className="cfe-tags-grid">
                    {FONT_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        className={`cfe-tag ${selectedCategories.includes(cat) ? 'selected' : ''}`}
                        onClick={() => toggleCategory(cat)}
                      >
                        {cat}
                        <span className="cfe-tag-count">{FONT_CATEGORY_COUNTS[cat]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Row 3: Active Selection Chips */}
                  {selectedCategories.length > 0 && (
                    <div className="cfe-chips-container">
                      {selectedCategories.map(item => (
                        <div key={item} id={`font-chip-${item}`} className="cfe-chip selected-chip">
                          <span>{item}</span>
                          <button
                            className="cfe-chip-remove"
                            onClick={() => removeCategoryChip(item)}
                            aria-label={`Remove ${item}`}
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
          </div>
        </div>

      <div className="fonts-page-wrapper">
        {/* ── LIST LAYOUT SECTION ── */}
        <section className="fonts-gallery-section" ref={galleryRef}>
          <div className="fonts-gallery-inner">
            
            <div className="font-controls-bar">
              <span className="top-bar-count">Showing {ITEMS_PER_PAGE} of 3200 fonts</span>
              
              <div className="font-controls-right">
                <div className="font-view-toggle">
                  <span 
                    className={`toggle-text ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid size={20} /> Card view
                  </span>
                  <span 
                    className={`toggle-text ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <Menu size={20} /> List view
                  </span>
                </div>
              </div>
            </div>

            <div className="global-preview-bar">
              <div className="gpb-left" ref={dropdownRef}>
                <input 
                  type="text" 
                  className="gpb-input" 
                  placeholder="Type your text here...."
                  value={globalText}
                  onChange={(e) => setGlobalText(e.target.value)}
                />
                {isDropdownOpen ? (
                  <ChevronUp 
                    className="gpb-chevron" 
                    size={20} 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                ) : (
                  <ChevronDown 
                    className="gpb-chevron" 
                    size={20} 
                    onClick={() => setIsDropdownOpen(true)} 
                  />
                )}

                {isDropdownOpen && (
                  <div className="gpb-dropdown">
                    {PRESET_TEXTS.map((text, i) => (
                      <div 
                        key={i} 
                        className="gpb-dropdown-item"
                        onClick={() => {
                          setGlobalText(text);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div key={currentPage} className={`fonts-cards-container ${viewMode === 'grid' ? 'grid-view' : ''}`}>
              {paginatedCards.map(font => (
                <FontCard
                    key={font.id}
                    font={font}
                    globalText={globalText}
                    globalFontSize={globalFontSize}
                    viewMode={viewMode}
                    savedIds={savedIds}
                    toggleSave={toggleSave}
                    openLogin={() => setIsLoginOpen(true)}
                  />
              ))}
            </div>

            {/* ── PAGINATION ── */}
            <Pagination
              totalItems={3200} // Faking 100 pages (100 * 32 items)

              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>

      {/* Login prompt triggered by Save button when logged out */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Fonts;
