import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialFontsData } from '../../data/fontsData';
import FontDetailsHero from './FontDetailsHero';
import FontStylesPreview from './FontStylesPreview';
import FontSpecimen from './FontSpecimen';
import FontSpecimenShowcase from './FontSpecimenShowcase';
import './font-details.css';

const FontDetails = () => {
  const { fontId } = useParams();
  const navigate = useNavigate();
  const [font, setFont] = useState(null);

  useEffect(() => {
    // Find the font by ID
    const foundFont = initialFontsData.find(f => f.id === parseInt(fontId));
    if (foundFont) {
      setFont(foundFont);
      // Optional: Set document title to the font name
      document.title = `${foundFont.name} - Ref.Design`;
    } else {
      // If font not found, redirect to the fonts gallery
      navigate('/fonts');
    }
  }, [fontId, navigate]);

  if (!font) {
    return <div className="font-details-loading">Loading...</div>;
  }

  return (
    <div className="font-details-page">
      <FontDetailsHero font={font} />
      
      <section className="font-details-specs" id="information">
        <div className="specs-container">
          <div className="spec-item">
            <span className="spec-label">Weights & Styles</span>
            <h3 className="spec-value">{font.weightsAndStyles}</h3>
          </div>
          <div className="spec-item">
            <span className="spec-label">Language Support</span>
            <h3 className="spec-value">{font.languageSupport}</h3>
          </div>
          <div className="spec-item">
            <span className="spec-label">Release Year</span>
            <h3 className="spec-value">{font.releaseYear}</h3>
          </div>
        </div>
      </section>

      <FontStylesPreview font={font} />
      
      <FontSpecimen font={font} />
      
      <FontSpecimenShowcase font={font} />
      
      <section className="font-details-content-placeholder">
        {/* Placeholder for future content scrolling */}
      </section>
    </div>
  );
};

export default FontDetails;
