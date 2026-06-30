import React, { useState, useEffect } from 'react';
import './HoverTests.css';

const ScrambleText = ({ text, isHovered }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += text.length / 15; // 15 frames
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <>{displayText}</>;
};

const HoverTestCard = ({ title, type, hoverText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="ht-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="ht-card-top">
        <h3 className="ht-card-name">Variation {type}: {title}</h3>
        <p className="ht-card-desc">Hover this card to test the preview text animation.</p>
      </div>
      <div className="ht-card-preview">
        <span className={`ht-preview-default ht-default-${type}`}>
          AaBbCcDdEeFfGgHhIiJjKkLlMm
        </span>
        <span className={`ht-preview-hover ht-hover-${type}`}>
          {type === 3 ? <ScrambleText text={hoverText} isHovered={isHovered} /> : hoverText}
        </span>
      </div>
    </div>
  );
};

const HoverTests = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hover-tests-page">
      <div className="ht-container">
        <h1>Hover Animation Previews</h1>
        <p>Test the 5 variations below. Hover over each card to see its specific animation style.</p>
        
        <div className="ht-list">
          <HoverTestCard 
            type={1} 
            title="Smooth Fade Swap" 
            hoverText="We promptly judged antique ivory buckles for the next prize." 
          />
          <HoverTestCard 
            type={2} 
            title="Slide-up Reveal" 
            hoverText="Jim quickly realized that the beautiful gowns are expensive." 
          />
          <HoverTestCard 
            type={3} 
            title="Character Scramble" 
            hoverText="The cajoling quirked sexy wizard mob persuade very influentially." 
          />
          <HoverTestCard 
            type={4} 
            title="Mask Reveal (Left to Right)" 
            hoverText="A quivering Texas zombie fought republic linked jewelry." 
          />
          <HoverTestCard 
            type={5} 
            title="Soft Blur-to-Clear" 
            hoverText="Jackie will budget for the most expensive zoology equipment." 
          />
        </div>
      </div>
    </div>
  );
};

export default HoverTests;
