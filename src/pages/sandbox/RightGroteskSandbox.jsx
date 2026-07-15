import React, { useState } from 'react';
import './RightGroteskSandbox.css';

const RightGroteskSandbox = () => {
  // Playground State
  const [testText, setTestText] = useState('Right Grotesk');
  const [weight, setWeight] = useState(400);
  const [width, setWidth] = useState(100);
  const [italic, setItalic] = useState(false);
  
  // Convert 0 to -10 for font slant axis in Roboto Flex
  const slantVal = italic ? -10 : 0;
  
  const pgStyle = {
    fontVariationSettings: `"wght" ${weight}, "wdth" ${width}, "slnt" ${slantVal}, "opsz" 144`,
  };

  const getWidthName = (w) => {
    if (w < 40) return 'Tall';
    if (w < 60) return 'Tight';
    if (w < 85) return 'Narrow';
    if (w < 110) return 'Compact';
    if (w < 130) return 'Casual';
    if (w < 145) return 'Wide';
    return 'Spatial';
  };

  const getWeightName = (w) => {
    if (w < 200) return 'Fine/Thin';
    if (w < 300) return 'Light';
    if (w < 400) return 'Regular';
    if (w < 500) return 'Medium';
    if (w < 600) return 'SemiBold';
    if (w < 700) return 'Bold';
    if (w < 800) return 'ExtraBold';
    return 'Black';
  };

  return (
    <div className="rg-sandbox-wrapper">
      {/* 1. HERO / FAMILY INTRODUCTION */}
      <section className="rg-hero">
        <div className="rg-hero-badge">Research Sandbox: Placeholder Font Simulated</div>
        <h1 className="rg-hero-title">Right<br/>Grotesk</h1>
        <p className="rg-hero-subtitle">Neutral, but not boring. A versatile and high-quality type family for serious and fun projects alike.</p>
      </section>

      {/* 2. FAMILY OVERVIEW */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Family Overview</h2>
          <span className="rg-section-meta">02</span>
        </div>
        <div className="rg-overview-grid">
          <div className="rg-overview-text">
            Right Grotesk blends the neutrality and functionality of workhorses with a good touch of distinctive personality. Not trendy, not timeless either, it was designed to be just Right.
          </div>
          <div className="rg-overview-stats">
            <div className="rg-stat-card">
              <span className="rg-stat-value">130</span>
              <span className="rg-stat-label">Total Styles</span>
            </div>
            <div className="rg-stat-card">
              <span className="rg-stat-value">3</span>
              <span className="rg-stat-label">Variable Axes</span>
            </div>
            <div className="rg-stat-card">
              <span className="rg-stat-value">7</span>
              <span className="rg-stat-label">Display Widths</span>
            </div>
            <div className="rg-stat-card">
              <span className="rg-stat-value">7</span>
              <span className="rg-stat-label">Weights</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGNER AND FOUNDRY */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Foundry & Origins</h2>
          <span className="rg-section-meta">03</span>
        </div>
        <div className="rg-designer-box">
          <div className="rg-designer-info">
            <h3>Alexander Slobzheninov</h3>
            <p>Type Designer</p>
          </div>
          <div className="rg-designer-info" style={{textAlign: 'right'}}>
            <h3>Pangram Pangram</h3>
            <p>Foundry (March 2020)</p>
          </div>
        </div>
      </section>

      {/* 4. DISPLAY VS TEXT COMPARISON */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Optical Sizing (Display vs Text)</h2>
          <span className="rg-section-meta">04</span>
        </div>
        <div className="rg-comparison-container">
          <div className="rg-comp-col">
            <h4>Display Family (98 Styles)</h4>
            <p style={{opacity: 0.7, marginBottom: 40}}>Tight spacing, high contrast, perfect for large headlines and posters.</p>
            <div className="rg-comp-display-text">Loud &<br/>Clear</div>
          </div>
          <div className="rg-comp-col">
            <h4>Text Family (32 Styles)</h4>
            <p style={{opacity: 0.7, marginBottom: 40}}>Looser spacing, wider proportions, optimized for reading paragraphs at small sizes.</p>
            <div className="rg-comp-text-text">
              The Text family tones down the extreme personality traits found in the Display cuts. It ensures perfect legibility by opening up the counters, adjusting the ink traps, and standardizing the spacing for editorial and UI applications.
            </div>
          </div>
        </div>
      </section>

      {/* 5. WIDTH SPECTRUM */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Width Spectrum (Display)</h2>
          <span className="rg-section-meta">05</span>
        </div>
        <div className="rg-spectrum-row">
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Tall</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 30'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Tight</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 50'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Narrow</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 75'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Compact</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 100'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Casual</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 120'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Wide</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 135'}}>Architecture</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Spatial</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wdth" 151'}}>Architecture</span></div>
        </div>
      </section>

      {/* 6. WEIGHT SPECTRUM */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Weight Spectrum</h2>
          <span className="rg-section-meta">06</span>
        </div>
        <div className="rg-spectrum-row">
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Fine</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 100'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Light</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 300'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Regular</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 400'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Medium</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 500'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Bold</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 700'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">ExtraBold</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 800'}}>Typography</span></div>
          <div className="rg-spectrum-item"><span className="rg-spectrum-label">Black</span><span className="rg-spectrum-preview" style={{fontVariationSettings: '"wght" 900'}}>Typography</span></div>
        </div>
      </section>

      {/* 7. UPRIGHT VS ITALIC */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Upright vs Italic</h2>
          <span className="rg-section-meta">07</span>
        </div>
        <div className="rg-comparison-container">
          <div className="rg-comp-col" style={{textAlign: 'center', padding: '80px 20px'}}>
            <div style={{fontSize: '5rem', fontVariationSettings: '"slnt" 0, "wght" 500'}}>Upright</div>
          </div>
          <div className="rg-comp-col" style={{textAlign: 'center', padding: '80px 20px'}}>
            <div style={{fontSize: '5rem', fontVariationSettings: '"slnt" -10, "wght" 500'}}>Italic</div>
          </div>
        </div>
      </section>

      {/* 8. VARIABLE PLAYGROUND */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Variable Axes Playground</h2>
          <span className="rg-section-meta">08</span>
        </div>
        <div className="rg-playground-container">
          <div className="rg-playground-preview" style={{fontSize: '8vw'}}>
            <textarea 
              className="rg-playground-input" 
              value={testText} 
              onChange={e => setTestText(e.target.value)}
              style={pgStyle}
              rows={1}
            />
          </div>
          <div className="rg-playground-controls">
            <div className="rg-control-group">
              <div className="rg-control-header">
                <span>Weight</span>
                <span>{getWeightName(weight)} ({weight})</span>
              </div>
              <input type="range" className="rg-slider" min="100" max="900" step="1" value={weight} onChange={e => setWeight(Number(e.target.value))} />
            </div>
            <div className="rg-control-group">
              <div className="rg-control-header">
                <span>Width</span>
                <span>{getWidthName(width)} ({width})</span>
              </div>
              <input type="range" className="rg-slider" min="25" max="151" step="1" value={width} onChange={e => setWidth(Number(e.target.value))} />
            </div>
            <div className="rg-control-group" style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: '16px'}}>
              <span className="rg-control-header" style={{margin:0}}>Italic (Slant)</span>
              <input type="checkbox" checked={italic} onChange={e => setItalic(e.target.checked)} style={{width: 24, height: 24, cursor: 'pointer'}} />
            </div>
          </div>
        </div>
      </section>

      {/* 9. LARGE HEADLINE SPECIMEN */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Large Headline</h2>
          <span className="rg-section-meta">09</span>
        </div>
        <div className="rg-headline-specimen" style={{fontVariationSettings: '"wght" 800, "wdth" 120, "opsz" 144'}}>
          Contemporary <br/>Typographic <br/>Systems
        </div>
      </section>

      {/* 10. PARAGRAPH SPECIMEN */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Paragraph Specimen (Text)</h2>
          <span className="rg-section-meta">10</span>
        </div>
        <div className="rg-paragraph-specimen" style={{fontVariationSettings: '"wght" 400, "wdth" 100, "opsz" 14'}}>
          Right Grotesk is an interpretation of the genre that doesn’t try to be a historical revival. Instead, it looks forward. The anatomy of the typeface is defined by its unusual details: reversed terminals on characters like the 'a' and 'r' add a sharp, cutting edge to the letterforms, while deep, smooth ink traps provide extra white space and clarity at small sizes. When scaled up, these ink traps become a defining stylistic feature, adding a robust, mechanical charm to headlines. It is a workhorse typeface that refuses to be completely invisible.
        </div>
      </section>

      {/* 11. ALPHABET SPECIMEN */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Alphabet</h2>
          <span className="rg-section-meta">11</span>
        </div>
        <div className="rg-alphabet-grid" style={{fontVariationSettings: '"wght" 500'}}>
          {'abcdefghijklmnopqrstuvwxyz'.split('').map(char => (
            <div className="rg-char-box" key={char}>{char}</div>
          ))}
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => (
            <div className="rg-char-box" key={char}>{char}</div>
          ))}
        </div>
      </section>

      {/* 12. NUMBERS AND PUNCTUATION */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Numbers & Punctuation</h2>
          <span className="rg-section-meta">12</span>
        </div>
        <div className="rg-alphabet-grid" style={{fontVariationSettings: '"wght" 400, "wdth" 100'}}>
          {'0123456789'.split('').map(char => (
            <div className="rg-char-box" key={char}>{char}</div>
          ))}
          {'!@#$%^&*()_+-=[]{}|;:,.<>?'.split('').map(char => (
            <div className="rg-char-box" key={char}>{char}</div>
          ))}
        </div>
      </section>

      {/* 13. OPENTYPE FEATURES */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">OpenType Features</h2>
          <span className="rg-section-meta">13</span>
        </div>
        <div className="rg-opentype-grid">
          <div className="rg-ot-card">
            <span className="rg-ot-tag">LIGA</span>
            <div className="rg-ot-preview">
              <span>fi fl</span>
              <span className="arrow">→</span>
              <span style={{fontFeatureSettings: '"liga" 1'}}>fi fl</span>
            </div>
          </div>
          <div className="rg-ot-card">
            <span className="rg-ot-tag">TNUM</span>
            <div className="rg-ot-preview">
              <span>01234</span>
              <span className="arrow">→</span>
              <span style={{fontFeatureSettings: '"tnum" 1'}}>01234</span>
            </div>
          </div>
          <div className="rg-ot-card">
            <span className="rg-ot-tag">CASE</span>
            <div className="rg-ot-preview">
              <span>(H-E)</span>
              <span className="arrow">→</span>
              <span style={{fontFeatureSettings: '"case" 1'}}>(H-E)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 14. LANGUAGE / SCRIPT SUPPORT */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Language Support</h2>
          <span className="rg-section-meta">14</span>
        </div>
        <div style={{fontSize: '2rem', lineHeight: 1.5}}>
          <strong>Latin:</strong> Afrikaans, Albanian, Asu, Basque, Bemba, Bena, Breton, Chiga, Colognian, Cornish, Croatian, Czech, Danish, Dutch, English, Estonian, Faroese, Filipino, Finnish, French, Friulian, Galician, Ganda, German...
          <br/><br/>
          <strong>Cyrillic:</strong> Russian, Ukrainian, Belarusian, Bulgarian, Macedonian, Serbian...
        </div>
      </section>

      {/* 15 & 16. GALLERY / REAL WORLD USAGE */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Specimen Gallery & In Use</h2>
          <span className="rg-section-meta">15-16</span>
        </div>
        <div className="rg-gallery-grid">
          <div className="rg-gallery-item large">
            <span className="rg-simulated-label">Placeholder Recreation</span>
            <div style={{textAlign: 'left', width: '100%'}}>
              <div style={{fontSize: '8vw', fontWeight: 900, fontVariationSettings: '"wdth" 120', letterSpacing: '-0.02em', lineHeight: 0.9}}>THE NEW<br/>STANDARD</div>
            </div>
          </div>
          <div className="rg-gallery-item" style={{background: '#FF3B30', color: '#FFF'}}>
            <span className="rg-simulated-label">Placeholder Layout</span>
            <div style={{fontVariationSettings: '"wdth" 50, "wght" 800', fontSize: '4vw'}}>POSTER<br/>DESIGN</div>
          </div>
          <div className="rg-gallery-item" style={{background: '#111', color: '#FFF'}}>
            <span className="rg-simulated-label">Placeholder UI</span>
            <div style={{fontVariationSettings: '"wght" 400', fontSize: '1.25rem', textAlign: 'left', alignSelf: 'flex-start'}}>
              <strong>App Interface</strong>
              <p style={{opacity: 0.7}}>Clean, highly legible text sizes combined with loud display headers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 17. STYLE TABLE */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Family / Style Table (Sample)</h2>
          <span className="rg-section-meta">17</span>
        </div>
        <table className="rg-style-table">
          <thead>
            <tr>
              <th>Style Name</th>
              <th>Preview</th>
              <th>Axes (wght, wdth)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compact Fine</td>
              <td className="rg-style-preview" style={{fontVariationSettings: '"wght" 200, "wdth" 100'}}>Right Grotesk</td>
              <td>200, 100</td>
            </tr>
            <tr>
              <td>Tall Regular</td>
              <td className="rg-style-preview" style={{fontVariationSettings: '"wght" 400, "wdth" 30'}}>Right Grotesk</td>
              <td>400, 30</td>
            </tr>
            <tr>
              <td>Casual Bold</td>
              <td className="rg-style-preview" style={{fontVariationSettings: '"wght" 700, "wdth" 120'}}>Right Grotesk</td>
              <td>700, 120</td>
            </tr>
            <tr>
              <td>Spatial Black</td>
              <td className="rg-style-preview" style={{fontVariationSettings: '"wght" 900, "wdth" 151'}}>Right Grotesk</td>
              <td>900, 151</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 18. LICENCE INFO */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Licence Information</h2>
          <span className="rg-section-meta">18</span>
        </div>
        <div style={{fontSize: '1.5rem', maxWidth: '800px', lineHeight: 1.5}}>
          Pangram Pangram offers granular licensing options. The font is <strong>Free to Try</strong> for personal work and student projects. Commercial licenses include Desktop, Web, App, and Broadcasting tiers, providing affordable scalability.
        </div>
      </section>

      {/* 19 & 20. TECH DETAILS & SOURCES */}
      <section>
        <div className="rg-section-header">
          <h2 className="rg-section-title">Technical Details & Sources</h2>
          <span className="rg-section-meta">19-20</span>
        </div>
        <div className="rg-sources">
          <p><strong>Glyph Count:</strong> ~600+ per style</p>
          <p><strong>Format:</strong> .otf, .woff, .woff2, Variable TTF</p>
          <br/>
          <p><strong>Research Sources:</strong></p>
          <ul>
            <li><a href="https://pangrampangram.com/products/right-grotesk" target="_blank" rel="noreferrer">Pangram Pangram Official Page</a></li>
            <li><a href="https://fontsinuse.com/typefaces/113337/right-grotesk" target="_blank" rel="noreferrer">Fonts In Use: Right Grotesk</a></li>
            <li><a href="https://befonts.com/right-grotesk-font-family.html" target="_blank" rel="noreferrer">BeFonts Overview</a></li>
            <li><a href="https://pimpmytype.com/" target="_blank" rel="noreferrer">Pimp My Type Font Review References</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RightGroteskSandbox;
