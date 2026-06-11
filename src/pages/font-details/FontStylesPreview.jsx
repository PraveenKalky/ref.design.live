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
  const [hoveredStyle, setHoveredStyle] = useState(styles[0]);

  const uprightStyles = styles.filter(s => !s.isItalic);
  const italicStyles = styles.filter(s => s.isItalic);

  return (
    <section className="font-styles-preview-section" id="styles">
      <div className="font-styles-preview-container">
        {/* Header Row */}
        <div className="preview-header">
          <h2 className="preview-font-name">{font?.name || 'Font Name'}</h2>
          <span className="preview-style-count">{styles.length} Styles</span>
        </div>

        <div className="preview-content-layout">
          {/* Left: Preview Box */}
          <div className="preview-box-container">
            <div
              className="preview-box"
              style={{
                fontFamily: font?.googleFont || 'inherit',
                fontWeight: hoveredStyle.weight,
                fontStyle: hoveredStyle.isItalic ? 'italic' : 'normal',
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
              const upright = uprightStyles[index];
              const italic = italicStyles[index];

              return (
                <div key={index} className="style-row-full">
                  {/* Left Column (Upright) */}
                  <div
                    className="style-half"
                    onMouseEnter={() => upright && setHoveredStyle(upright)}
                  >
                    {upright ? (
                      <>
                        <span
                          className="style-name"
                          style={{
                            fontWeight: upright.weight,
                            fontStyle: 'normal',
                          }}
                        >
                          {upright.name}
                        </span>
                        <span className="style-weight">{upright.weight}</span>
                      </>
                    ) : <span />}
                  </div>

                  {/* Right Column (Italic) */}
                  <div
                    className="style-half"
                    onMouseEnter={() => italic && setHoveredStyle(italic)}
                  >
                    {italic ? (
                      <>
                        <span
                          className="style-name"
                          style={{
                            fontWeight: italic.weight,
                            fontStyle: 'italic',
                          }}
                        >
                          {italic.name}
                        </span>
                        <span className="style-weight">{italic.weight}</span>
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
