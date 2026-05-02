import React, { useState, useRef } from 'react';
import { Bookmark, Download, Plus, ChevronDown, Type, RotateCcw } from 'lucide-react';
import Pagination from '../components/pagination/Pagination';
import './Fonts.css';

const TABS = ['All', 'Sans-Serif', 'Serif', 'Display', 'Monospace', 'Handwritten', 'Script', 'Geometric', 'Humanist'];

const PILLS = [
  { name: 'Sans-Serif', count: '1842' },
  { name: 'Serif', count: '1203' },
  { name: 'Display', count: '874' },
  { name: 'Monospace', count: '312' },
  { name: 'Handwritten', count: '547' },
  { name: 'Script', count: '693' },
  { name: 'Geometric', count: '428' },
  { name: 'Humanist', count: '376' },
  { name: 'Slab Serif', count: '284' },
  { name: 'Condensed', count: '196' },
  { name: 'Variable', count: '318' },
  { name: 'Rounded', count: '241' },
  { name: 'Wide', count: '167' },
  { name: 'Retro', count: '432' },
  { name: 'Futuristic', count: '289' },
  { name: 'Decorative', count: '514' },
  { name: 'Transitional', count: '193' },
  { name: 'Bold & Heavy', count: '621' },
  { name: 'Thin & Light', count: '398' },
];

const initialFontsData = [
  { id: 1, name: 'RITTOKE', author: 'braden', styles: 1, license: 'Free for personal use' },
  { id: 2, name: 'Yorkmade Pro Sans Serif Font', author: 'limitype ✓', styles: 18, license: 'Free for Personal Use' },
  { id: 3, name: 'Pixel Forge', author: 'jerod.maggio', styles: 2, license: 'Free for personal use' },
  { id: 4, name: 'Grift', author: '38.ineart Studio', styles: 4, license: 'Free for personal use' },
  { id: 5, name: 'Cruel Reality', author: 'WS Paradose', styles: 3, license: 'Free for personal use' },
  { id: 6, name: 'Halfre', author: 'Studio Type', styles: 6, license: 'Free for personal use' },
  { id: 7, name: 'Kalieb', author: 'FontCraft', styles: 2, license: 'Free for personal use' },
  { id: 8, name: 'After', author: 'TypeLab', styles: 1, license: 'Free for personal use' },
  { id: 9, name: 'Surgena', author: 'NovaBrush', styles: 5, license: 'Free for personal use' },
  { id: 10, name: 'Malibu Sunday', author: 'Blankids Studio', styles: 3, license: 'Free for personal use' },
  { id: 11, name: 'iBrand', author: 'Markline', styles: 1, license: 'Free for personal use' },
  { id: 12, name: 'Epic Pro', author: 'DesignForge', styles: 7, license: 'Free for personal use' },
  { id: 13, name: 'Oslla', author: 'Marvadesign', styles: 2, license: 'Free for personal use' },
  { id: 14, name: 'Vogun', author: 'Yukita Creative', styles: 1, license: 'Free for personal use' },
  { id: 15, name: 'The Youth', author: 'Handpik', styles: 4, license: 'Free for personal use' },
  { id: 16, name: 'Zenith', author: 'TypeFusion', styles: 3, license: 'Free for personal use' },
  { id: 17, name: 'Nebula', author: 'CosmicType', styles: 2, license: 'Free for personal use' },
  { id: 18, name: 'Quasar', author: 'StarFonts', styles: 5, license: 'Free for personal use' },
  { id: 19, name: 'Pulsar', author: 'NeonType', styles: 1, license: 'Free for personal use' },
  { id: 20, name: 'Comet', author: 'SpaceType', styles: 3, license: 'Free for personal use' },
  { id: 21, name: 'Aurora', author: 'NightType', styles: 2, license: 'Free for personal use' },
  { id: 22, name: 'Eclipse', author: 'ShadowType', styles: 4, license: 'Free for personal use' },
  { id: 23, name: 'Horizon', author: 'SkylType', styles: 1, license: 'Free for personal use' },
  { id: 24, name: 'Meridian', author: 'GlobeType', styles: 6, license: 'Free for personal use' },
  { id: 25, name: 'Equinox', author: 'SolarType', styles: 2, license: 'Free for personal use' },
  { id: 26, name: 'Solstice', author: 'SunType', styles: 3, license: 'Free for personal use' },
  { id: 27, name: 'Vortex', author: 'WindType', styles: 1, license: 'Free for personal use' },
  { id: 28, name: 'Titan', author: 'BoldType', styles: 5, license: 'Free for personal use' },
  { id: 29, name: 'Atlas', author: 'MapType', styles: 2, license: 'Free for personal use' },
  { id: 30, name: 'Cosmos', author: 'UniverseType', styles: 7, license: 'Free for personal use' },
  { id: 31, name: 'Phantom', author: 'GhostType', styles: 1, license: 'Free for personal use' },
  { id: 32, name: 'Nomad', author: 'WanderType', styles: 3, license: 'Free for personal use' },
];

const allFontsData = Array.from({ length: 20 }, (_, pageIndex) => 
  initialFontsData.map(font => ({
    ...font,
    id: pageIndex * 32 + font.id,
    name: pageIndex === 0 ? font.name : `${font.name} ${pageIndex + 1}`
  }))
).flat();

const ITEMS_PER_PAGE = 32;

const Fonts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('All');
  const [activePill, setActivePill] = useState(null);
  const galleryRef = useRef(null);

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
            <div className="fonts-breadcrumb">
              All Items &nbsp;»&nbsp; <span className="current">Fonts</span>
            </div>
            <h1 className="fonts-heading">
              <span className="dark-text">High-Quality </span>
              <span className="purple-text">Fonts</span>
            </h1>
            <p className="fonts-subtext">
              Set your projects apart with exceptional typography. Explore our range of premium fonts,
              from statement text to subtle body copy; we have it all to capture the mood for your project.
            </p>
          </div>
        </section>

        {/* ── CATEGORIES PILLS/TABS SECTION ── */}
        <section className="fonts-categories-section">
          <div className="fonts-categories-row1">
            {TABS.map((tab, idx) => (
              <React.Fragment key={tab}>
                <button
                  className={`fonts-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
                {idx === 0 && <span className="fonts-tab-divider">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="fonts-categories-row2">
            {PILLS.map((pill) => (
              <button
                key={pill.name}
                className={`fonts-pill-btn ${activePill === pill.name ? 'active' : ''}`}
                onClick={() => setActivePill(pill.name)}
              >
                {pill.name} <span className="pill-count">{pill.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── LIST LAYOUT SECTION ── */}
        <section className="fonts-gallery-section" ref={galleryRef}>
          <div className="fonts-gallery-inner">
            
            <div className="fonts-list-container">
              {paginatedCards.map(font => (
                <div key={font.id} className="font-list-row">
                  {/* Left Side: Info + Preview */}
                  <div className="font-info-preview">
                    <div className="font-header-info">
                      <h3 className="font-name-title">{font.name}</h3>
                      <p className="font-meta-info">
                        Added by <span className="font-author">{font.author}</span> ({font.styles} Style{font.styles > 1 ? 's' : ''})
                      </p>
                    </div>
                    <div className="font-large-preview">
                      {font.name} AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
                    </div>
                  </div>

                  {/* Right Side: License + Actions */}
                  <div className="font-actions-section">
                    <span className="font-license-text">{font.license}</span>
                    <div className="font-btn-group">
                      <button className="font-action-btn download">
                        <Download size={18} strokeWidth={2.5} /> Download
                      </button>
                      <button className="font-action-btn add-to-list">
                        <Plus size={18} strokeWidth={2.5} /> Add to List
                      </button>
                    </div>
                  </div>
                </div>
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
