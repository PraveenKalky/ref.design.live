import React, { useState } from 'react';
import './font-styles-preview.css';

const styles = [
  { id: 1, name: 'Thin', weight: 100, isItalic: false },
  { id: 2, name: 'Thin Italic', weight: 100, isItalic: true },
  { id: 3, name: 'Light', weight: 300, isItalic: false },
  { id: 4, name: 'Light Italic', weight: 300, isItalic: true },
  { id: 5, name: 'Regular', weight: 400, isItalic: false },
  { id: 6, name: 'Italic', weight: 400, isItalic: true },
  { id: 7, name: 'Medium', weight: 500, isItalic: false },
  { id: 8, name: 'Medium Italic', weight: 500, isItalic: true },
  { id: 9, name: 'SemiBold', weight: 600, isItalic: false },
  { id: 10, name: 'SemiBold Italic', weight: 600, isItalic: true },
  { id: 11, name: 'Bold', weight: 700, isItalic: false },
  { id: 12, name: 'Bold Italic', weight: 700, isItalic: true },
  { id: 13, name: 'Black', weight: 900, isItalic: false },
  { id: 14, name: 'Black Italic', weight: 900, isItalic: true },
];

const FontStylesPreview = ({ font }) => {
  // Default to Regular (id: 5)
  const [hoveredStyle, setHoveredStyle] = useState(styles[4]);

  return (
    <section className="font-styles-preview-section" id="styles">
      <div className="font-styles-preview-container">
        
        {/* Top Section: Flowing Styles List */}
        <div className="flowing-styles-list">
          {styles.map((style) => (
            <div
              key={style.id}
              className="flowing-style-item"
              onMouseEnter={() => setHoveredStyle(style)}
            >
              <span
                className="flowing-style-name"
                style={{
                  fontWeight: style.weight,
                  fontStyle: style.isItalic ? 'italic' : 'normal',
                }}
              >
                {style.name}
              </span>
              <sup className="flowing-style-weight">{style.weight}</sup>
            </div>
          ))}
        </div>

        {/* Bottom Section: Large Preview Panel */}
        <div className="large-preview-panel">
          <div
            className="large-preview-text"
            style={{
              fontFamily: font?.googleFont || 'inherit',
              fontWeight: hoveredStyle.weight,
              fontStyle: hoveredStyle.isItalic ? 'italic' : 'normal',
            }}
          >
            <div>My Girl Wove Six Dozen Plaid</div>
            <div>Jackets Before She Quit.</div>
            <div>!@#$%^&*()_+ 1234567890</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FontStylesPreview;
