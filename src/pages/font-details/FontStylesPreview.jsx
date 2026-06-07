import React, { useState } from 'react';
import './font-styles-preview.css';

const stylesData = [
  { id: 1, name: 'Thin', fontWeight: 100, fontStyle: 'normal' },
  { id: 2, name: 'Thin Italic', fontWeight: 100, fontStyle: 'italic' },
  { id: 3, name: 'Light', fontWeight: 300, fontStyle: 'normal' },
  { id: 4, name: 'Light Italic', fontWeight: 300, fontStyle: 'italic' },
  { id: 5, name: 'Regular', fontWeight: 400, fontStyle: 'normal' },
  { id: 6, name: 'Italic', fontWeight: 400, fontStyle: 'italic' },
  { id: 7, name: 'Medium', fontWeight: 500, fontStyle: 'normal' },
  { id: 8, name: 'Medium Italic', fontWeight: 500, fontStyle: 'italic' },
  { id: 9, name: 'SemiBold', fontWeight: 600, fontStyle: 'normal' },
  { id: 10, name: 'SemiBold Italic', fontWeight: 600, fontStyle: 'italic' },
  { id: 11, name: 'Bold', fontWeight: 700, fontStyle: 'normal' },
  { id: 12, name: 'Bold Italic', fontWeight: 700, fontStyle: 'italic' },
  { id: 13, name: 'Black', fontWeight: 900, fontStyle: 'normal' },
  { id: 14, name: 'Black Italic', fontWeight: 900, fontStyle: 'italic' }
];

const FontStylesPreview = ({ font }) => {
  const [hoveredStyle, setHoveredStyle] = useState(stylesData[0]);

  const uprightStyles = stylesData.filter(s => s.fontStyle === 'normal');
  const italicStyles = stylesData.filter(s => s.fontStyle === 'italic');

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
                fontWeight: hoveredStyle.fontWeight,
                fontStyle: hoveredStyle.fontStyle,
              }}
            >
              <div className="preview-text">AaBbCc</div>
              <div className="preview-text">01234567</div>
              <div className="preview-text">{`{(!@#$?&)}`}</div>
            </div>
          </div>

        {/* Right: Styles List */}
        <div className="styles-list-container">
          {Array.from({ length: Math.max(uprightStyles.length, italicStyles.length) }).map((_, index) => {
            const uprightStyle = uprightStyles[index];
            const italicStyle = italicStyles[index];
            
            return (
              <div key={index} className="style-row-full">
                {/* Left Column (Upright) */}
                <div 
                  className="style-half"
                  onMouseEnter={() => uprightStyle && setHoveredStyle(uprightStyle)}
                >
                  {uprightStyle ? (
                    <>
                      <span 
                        className="style-name"
                        style={{
                          fontWeight: uprightStyle.fontWeight,
                          fontStyle: uprightStyle.fontStyle,
                        }}
                      >
                        {uprightStyle.name}
                      </span>
                      <span className="style-weight">{uprightStyle.fontWeight}</span>
                    </>
                  ) : <span />}
                </div>

                {/* Right Column (Italic) */}
                <div 
                  className="style-half"
                  onMouseEnter={() => italicStyle && setHoveredStyle(italicStyle)}
                >
                  {italicStyle ? (
                    <>
                      <span 
                        className="style-name"
                        style={{
                          fontWeight: italicStyle.fontWeight,
                          fontStyle: italicStyle.fontStyle,
                        }}
                      >
                        {italicStyle.name}
                      </span>
                      <span className="style-weight">{italicStyle.fontWeight}</span>
                    </>
                  ) : <span />}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
};

export default FontStylesPreview;
