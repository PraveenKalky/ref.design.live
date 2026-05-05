import React, { useState, useRef } from 'react';
import { Bookmark, Download, Plus, ChevronDown, ChevronUp, X, Type, RotateCcw, LayoutGrid, Menu, Maximize2, MoveHorizontal } from 'lucide-react';
import Pagination from '../components/pagination/Pagination';
import '../components/filter-bar/filter-bar.css';
import '../components/filters/category-filter-expanded.css';
import './Fonts.css';

const FONT_CATEGORIES = [
  'Sans-Serif', 'Serif', 'Display', 'Monospace', 'Handwritten', 'Script', 
  'Geometric', 'Humanist', 'Slab Serif', 'Condensed', 'Variable', 'Rounded', 
  'Wide', 'Retro', 'Futuristic', 'Decorative', 'Transitional', 'Bold & Heavy', 'Thin & Light'
];

const FONT_CATEGORY_COUNTS = {
  'Sans-Serif': '1842', 'Serif': '1203', 'Display': '874', 'Monospace': '312',
  'Handwritten': '547', 'Script': '693', 'Geometric': '428', 'Humanist': '376',
  'Slab Serif': '284', 'Condensed': '196', 'Variable': '318', 'Rounded': '241',
  'Wide': '167', 'Retro': '432', 'Futuristic': '289', 'Decorative': '514',
  'Transitional': '193', 'Bold & Heavy': '621', 'Thin & Light': '398'
};

const initialFontsData = [
  { id: 1, name: "Neue Montreal", description: "The only Grotesk you'll ever need.", stylesInfo: "36 styles + Variable cut\nIncluding Italics & Text", category: "Sans-Serif", badge: "Update", isVariable: true },
  { id: 2, name: "PP Fragment", description: "Classic serifs with a contemporary twist.", stylesInfo: "32 styles + Variable cut\nIncluding Italic & Bold", category: "Serif", badge: "New", isVariable: true },
  { id: 3, name: "Right Grotesk", description: "Neutral, but not boring.", stylesInfo: "130 styles + Variable cut\nCompact to Wide", category: "Sans-Serif", isVariable: true },
  { id: 4, name: "Mori", description: "A versatile gothic sans-serif.", stylesInfo: "16 styles\nIncluding Italics", category: "Sans-Serif" },
  { id: 5, name: "Pangram Sans", description: "The geometric workhorse.", stylesInfo: "28 styles + Variable cut\nIncluding Rounded", category: "Geometric", isVariable: true },
  { id: 6, name: "Formula", description: "A highly versatile display font.", stylesInfo: "20 styles\nIncluding Condensed", category: "Display" },
  { id: 7, name: "Editorial New", description: "Elegant retro editorial serif.", stylesInfo: "16 styles + Variable cut\nIncluding Italics", category: "Serif", badge: "Update", isVariable: true },
  { id: 8, name: "Telegraph", description: "A sturdy workhorse with character.", stylesInfo: "16 styles\nIncluding Italics", category: "Sans-Serif" },
];

const FontCard = ({ font }) => {
  const [fontSize, setFontSize] = useState(48);
  const [letterSpacing, setLetterSpacing] = useState(0);

  return (
    <div className="font-card">
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
          <p className="font-card-desc">{font.description}</p>
          
          <div className="font-card-hover-controls">
            <div className="fchc-widgets">
              <div className="fchc-dropdown">
                Cond Bold <ChevronDown size={18} />
              </div>
              <div className="fchc-slider">
                <Maximize2 size={18} />
                <input 
                  type="range" 
                  min="24" 
                  max="120" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value)}
                  className="fchc-slider-input" 
                />
                <span>{fontSize}px</span>
              </div>
              <div className="fchc-slider">
                <MoveHorizontal size={18} />
                <input 
                  type="range" 
                  min="-0.1" 
                  max="0.5" 
                  step="0.01"
                  value={letterSpacing} 
                  onChange={(e) => setLetterSpacing(e.target.value)}
                  className="fchc-slider-input" 
                />
                <span>{letterSpacing}em</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-top-right">
          <p className="font-card-styles">{font.stylesInfo}</p>
          <button className="font-check-out-btn">Download</button>
          <button className="font-check-out-btn icon-only"><Bookmark size={16} /></button>
        </div>
      </div>
      
      <div className="font-card-preview">
        <span className="preview-default">AaBbCcDdEeFfGg</span>
        <span className="preview-hover" style={{ fontSize: `${fontSize}px`, letterSpacing: `${letterSpacing}em` }}>
          Six javelins thrown by the quick savages whizzed forty paces beyond the mark.
        </span>
      </div>
    </div>
  );
};

const allFontsData = Array.from({ length: 6 }, (_, pageIndex) => 
  initialFontsData.map(font => ({
    ...font,
    id: pageIndex * 12 + font.id,
    name: pageIndex === 0 ? font.name : `${font.name} ${pageIndex + 1}`
  }))
).flat().slice(0, 62);

const ITEMS_PER_PAGE = 12;

const Fonts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const galleryRef = useRef(null);

  const [activeTab, setActiveTab] = useState('popular');
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(['Sans-Serif']);

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
  const paginatedCards = allFontsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
              <span className="top-bar-count">Showing {ITEMS_PER_PAGE} of {allFontsData.length} fonts</span>
              
              <div className="font-controls-right">
                <div className="font-view-toggle">
                  <span className="toggle-text"><LayoutGrid size={20} /> Card view</span>
                  <span className="toggle-text active"><Menu size={20} /> List view</span>
                </div>
              </div>
            </div>

            <div className="fonts-cards-container">
              {paginatedCards.map(font => (
                <FontCard key={font.id} font={font} />
              ))}
            </div>

            {/* ── PAGINATION ── */}
            <Pagination
              totalItems={allFontsData.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Fonts;
