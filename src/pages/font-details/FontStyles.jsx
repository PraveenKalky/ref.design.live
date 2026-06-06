import React, { useState } from 'react';
import { ShoppingCart, Check, RotateCcw } from 'lucide-react';
import './font-details.css';

const FontStyles = ({ font }) => {
  const [previewText, setPreviewText] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [addedStyles, setAddedStyles] = useState({});

  if (!font || !font.stylesList) return null;

  const defaultPreview = font.name || "Neue Montreal";
  const activePreviewText = previewText || defaultPreview;

  const handleToggleCart = (styleName) => {
    setAddedStyles(prev => ({
      ...prev,
      [styleName]: !prev[styleName]
    }));
  };

  const handleResetPreview = () => {
    setPreviewText('');
  };

  return (
    <section id="styles" className="font-styles-section">
      <div className="section-container">
        
        {/* Section Header with Controls */}
        <div className="styles-header">
          <div className="styles-header-left">
            <h2 className="styles-section-title">Styles</h2>
            <span className="styles-count">{font.stylesList.length} styles available</span>
          </div>
          
          <div className="styles-header-right">
            {/* Custom Input */}
            <div className="styles-input-wrapper">
              <input
                type="text"
                placeholder="Type here to test all styles..."
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="styles-preview-input"
              />
              {previewText && (
                <button 
                  onClick={handleResetPreview} 
                  className="styles-reset-btn"
                  title="Reset preview text"
                >
                  <RotateCcw size={16} />
                </button>
              )}
            </div>

            {/* Font Size Slider */}
            <div className="styles-size-slider-group">
              <span className="slider-label">{fontSize}px</span>
              <input
                type="range"
                min="16"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="styles-size-slider"
                style={{
                  background: `linear-gradient(to right, #E8323C 0%, #E8323C ${(fontSize - 16) / (100 - 16) * 100}%, #333 ${(fontSize - 16) / (100 - 16) * 100}%, #333 100%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Styles List Table */}
        <div className="styles-list">
          {font.stylesList.map((style) => {
            const isAdded = !!addedStyles[style.name];
            return (
              <div key={style.name} className="style-row">
                {/* Left Column: Style Metadata */}
                <div className="style-meta">
                  <span className="style-name">{style.name}</span>
                  <span className="style-details">Weight {style.weight}</span>
                </div>

                {/* Center Column: Text Preview */}
                <div className="style-preview-container">
                  <div
                    className="style-preview-text"
                    style={{
                      fontFamily: font.googleFont || 'inherit',
                      fontWeight: style.weight,
                      fontStyle: style.italic ? 'italic' : 'normal',
                      fontSize: `${fontSize}px`
                    }}
                  >
                    {activePreviewText}
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="style-actions">
                  <button
                    onClick={() => handleToggleCart(style.name)}
                    className={`style-cart-btn ${isAdded ? 'added' : ''}`}
                    title={isAdded ? 'Remove from cart' : 'Add style to cart'}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        <span>$30</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FontStyles;
