import React, { useState, useEffect } from 'react';
import './font-styles-preview.css';

const stylesData = [
  { id: 1, name: 'Thin', weight: 100, italic: false },
  { id: 2, name: 'Thin Italic', weight: 100, italic: true },
  { id: 3, name: 'Light', weight: 300, italic: false },
  { id: 4, name: 'Light Italic', weight: 300, italic: true },
  { id: 5, name: 'Regular', weight: 400, italic: false },
  { id: 6, name: 'Italic', weight: 400, italic: true },
  { id: 7, name: 'Medium', weight: 500, italic: false },
  { id: 8, name: 'Medium Italic', weight: 500, italic: true },
  { id: 9, name: 'SemiBold', weight: 600, italic: false },
  { id: 10, name: 'SemiBold Italic', weight: 600, italic: true },
  { id: 11, name: 'Bold', weight: 700, italic: false },
  { id: 12, name: 'Bold Italic', weight: 700, italic: true },
  { id: 13, name: 'Black', weight: 900, italic: false },
  { id: 14, name: 'Black Italic', weight: 900, italic: true }
];

const FontStylesPreview = ({ font }) => {
  const [hoveredStyle, setHoveredStyle] = useState(stylesData[0]);

  // Log full styles array once on load
  useEffect(() => {
    console.log('Full styles array (14 items check):', stylesData);
  }, []);

  const uprightStyles = stylesData.filter(s => !s.italic);
  const italicStyles = stylesData.filter(s => s.italic);

  return (
    <section className="font-styles-preview-section" id="styles">
      <div className="font-styles-preview-container">
        {/* Header Row */}
        <div className="preview-header">
          <h2 className="preview-font-name">{font?.name || 'Font Name'}</h2>
          <span className="preview-style-count">14 Styles</span>
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
              {uprightStyles.map((style) => (
                <div 
                  key={style.id} 
                  className="style-half"
                  onMouseEnter={() => {
                    console.log('Hovered style:', style);
                    setHoveredStyle(style);
                  }}
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
              {italicStyles.map((style) => (
                <div 
                  key={style.id} 
                  className="style-half"
                  onMouseEnter={() => {
                    console.log('Hovered style:', style);
                    setHoveredStyle(style);
                  }}
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
