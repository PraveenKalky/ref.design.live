import React from 'react';
import './information-section.css';

const InformationSection = ({ font }) => {
  // We can customize the about section name based on the current font,
  // but we keep the editorial copy exactly as requested by the user.
  const fontName = font?.name || 'Terrane';

  const handleDownloadSpecimen = () => {
    // Mock specimen download behavior
    alert(`Downloading PDF specimen for ${fontName}...`);
  };

  return (
    <section className="info-section" id="information">
      <div className="info-container">
        <h2 className="info-title">Information</h2>
        
        <div className="info-layout">
          {/* Left Column: Metadata */}
          <div className="info-metadata-column">
            <div className="info-metadata-grid">
              <div className="info-group">
                <span className="info-label">Design</span>
                <p className="info-value">Emmanuel Besse</p>
              </div>
              
              <div className="info-group">
                <span className="info-label">Team</span>
                <p className="info-value">
                  Léa Bruneau<br />
                  Hugues Gentile
                </p>
              </div>
              
              <div className="info-group info-group-version">
                <span className="info-label">Version</span>
                <p className="info-value">1.001</p>
              </div>
              
              <div className="info-group info-group-awards">
                <span className="info-label">Awards & distinctions</span>
                <p className="info-value">
                  14th Hiiibrand International Brand & Communication Design Awards - Bronze Awards<br />
                  Typehelp 2025 top release<br />
                  Club des Directeurs Artistiques 2025 3rd Prize
                </p>
              </div>
            </div>
            
            <button className="info-download-btn" onClick={handleDownloadSpecimen}>
              Download PDF Specimen
            </button>
          </div>
          
          {/* Right Column: Editorial Content Area */}
          <div className="info-content-column">
            <span className="info-label info-about-label">About this font</span>
            <h3 className="info-subheading">
              {fontName === 'Terrane' ? 'Terrane, a typeface that opens dialogues' : `${fontName}, a typeface that opens dialogues`}
            </h3>
            
            <div className="info-editorial-text">
              <p>
                Terrane is a humanist typeface designed to open dialogues. It exemplifies the dualities inherent in humanist
                design by balancing apparent simplicity with subtle complexity. As a low-contrast sans-serif, Terrane projects
                clarity and openness with forms that feel culturally grounded and organic. While Terrane's design roots are firmly
                planted in the humanist sans tradition, the serif counterpart explores more exotic, lesser-known traits.
                Methodical and modern, Terrane proposes a synthesis of warmth and exactitude.
              </p>
              <p>
                While Terrane's bold weights carry a sense of warm cheerfulness, it is able to behave as a contemplative and
                assertive typeface. This subtle confidence feels appropriate where restraint and rigor are expected. Terrain
                establishes a steady, composed tone effectively conveying intellectual rigor and human-centered narratives.
                The humanist curves contribute to a somewhat natural cadence that's inviting to the reader without
                compromising its structural integrity. At the same time, Terrane's moderate contrast and careful construction
                anchor it in a framework of utilitarian elegance.
              </p>
              <p>
                The true versatility of Terrane lies in its dual nature as both a sans-serif and a serifed typeface. Terrane Sans is
                serviceable and polyvalent, marked by its low contrast and not-so-wide apertures that secure readability in
                demanding environments. Meanwhile, Terrane Serif introduces stone-cut gravitas and maintains the low-
                contrast ethos of its counterpart. Both typefaces share identical proportions, and pairing them creates a
                harmonious relationship. Transitioning from one to another is seamless, creating its own miniature design
                system.
              </p>
              <p>
                With its inscriptional quality, Terrane Serif brings a sense of permanence and authority, making it compelling in
                an editorial context and striking as a small-size display typeface. Terrane Serif is a nuanced acknowledgment of
                inscriptional traditions in that it does not resort to the fragility of high-contrast designs. The serifs are measured
                and deliberate, suggesting an architectural solidity that complements the open and contemporary structure of
                the sans-serif. This Petit Serif-inspired approach stands apart as a thoughtful and functional reimagining of
                classical forms but also of some photo-lettering exploration of the 70s.
              </p>
              <p>
                Terrane Sans feels at ease where clarity and approachability are expected, making it exemplary for applications
                that must communicate professionalism and accessibility. The serif variant, on the other hand, lends itself to
                literary layouts that express modern relevance and cultural depth. Together, the two styles enable designers to
                create typography systems that know how to stay both cohesive and full of nuances, serving as a toolkit for
                storytelling across mediums.
              </p>
              <p>
                Terrane is a visual conversation between the human and the monumental. It's right at home in both digital
                frameworks and engraved in stone, collating eras and mediums with understated elegance. Whether supporting
                an academic journal, guiding a museum visitor, or defining a brand's voice, Terrane adapts with presence,
                serving as both a vessel and a canvas for the ideas it carries. It is, in every sense, a typeface that opens
                dialogues.
              </p>
              
              <p className="info-campaign">Campaign by Maxime Verret</p>
            </div>
            
            <div className="info-formats-section">
              <span className="info-label">Formats</span>
              <p className="info-value">Static (OTF, TTF, WOFF, WOFF2)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationSection;
