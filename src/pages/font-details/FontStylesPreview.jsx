import React, { useState } from 'react';
import './font-styles-preview.css';

const FontStylesPreview = ({ font }) => {
  const [hoveredStyle, setHoveredStyle] = useState(
    font?.stylesList?.[0] || { weight: 400, italic: false }
  );

  const uprightStyles = font?.stylesList?.filter(s => !s.italic) || [];
  const italicStyles = font?.stylesList?.filter(s => s.italic) || [];

  return (
    <section className="font-styles-preview-section" id="styles">
      <div className="font-styles-preview-container">
        {/* Header Row */}
        <div className="preview-header">
          <h2 className="preview-font-name">{font?.name || 'Font Name'}</h2>
          <span className="preview-style-count">
            {font?.stylesList ? `${font.stylesList.length} Styles` : '16 Styles'}
          </span>
        </div>

        <div className="preview-content-layout">
          {/* Left: Preview Box */}
          <div className="preview-box-container">
            <div 
              className="preview-box"
              style={{
                fontFamily: font?.googleFont || 'inherit',
                fontWeight: hoveredStyle.weight,
                fontStyle: hoveredStyle.italic ? 'italic' : 'normal',
              }}
            >
              <div className="preview-text">AaBbCc</div>
              <div className="preview-text">01234567</div>
              <div className="preview-text">{`{(!@#$?&)}`}</div>
            </div>
          </div>

        {/* Right: Styles List */}
        <div className="styles-list-container">
          <div className="styles-column">
            {uprightStyles.map((style, index) => (
              <div 
                key={index} 
                className="style-row"
                onMouseEnter={() => setHoveredStyle(style)}
              >
                <span 
                  className="style-name"
                  style={{
                    fontWeight: style.weight,
                    fontStyle: style.italic ? 'italic' : 'normal',
                  }}
                >
                  {style.name}
                </span>
                <span className="style-weight">{style.weight}</span>
              </div>
            ))}
          </div>
          
          <div className="styles-column">
            {italicStyles.map((style, index) => (
              <div 
                key={index} 
                className="style-row"
                onMouseEnter={() => setHoveredStyle(style)}
              >
                <span 
                  className="style-name"
                  style={{
                    fontWeight: style.weight,
                    fontStyle: style.italic ? 'italic' : 'normal',
                  }}
                >
                  {style.name}
                </span>
                <span className="style-weight">{style.weight}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FontStylesPreview;
