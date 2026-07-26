import React, { useEffect } from 'react';
import { HERO_HTML } from './WebsitesHeroHtml';
import rawCss from './Websites.css?raw';

export default function Websites() {
  useEffect(() => {
    // Check if preloader is currently active in the document DOM
    const hasPreloader = !!document.querySelector('.preloader');
    
    // If preloader is active, wait for it to counter-wipe and hide (approx 6.2s)
    // Otherwise, trigger the animations immediately (route navigation landing)
    const startDelay = hasPreloader ? 6200 : 100;

    const runAnimation = () => {
      // 1. Gather all staircase thumbnail grid items inside the websites page
      const gridItems = Array.from(document.querySelectorAll('.websites-page section .relative')).filter(el => {
        return el.querySelector('img') && (
          el.classList.contains('size-[22px]') || 
          el.classList.contains('w-[22px]') || 
          el.style.width === '24px'
        );
      });

      // 2. Prepare them for the Rain Drop entrance animation by setting transparent initial state
      gridItems.forEach(item => {
        item.classList.add('staircase-img-container');
      });

      // 3. Play Rain Drop entrance animation with randomized delays and duration bounds
      gridItems.forEach((item) => {
        const delay = Math.random() * 0.7;
        const duration = 1.0 + Math.random() * 0.4;
        
        item.style.transition = `transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.15) ${delay}s, opacity ${duration * 0.8}s ease ${delay}s`;
        
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translate3d(0, 0, 0)';
        }, 50);
      });

      // 4. Forcefield mouse tracking handler activation timer (triggers once raindrops land)
      let active = false;
      const enableTimer = setTimeout(() => {
        active = true;
        gridItems.forEach(item => {
          item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        });
      }, 2200);

      const handleMouseMove = (e) => {
        if (!active) return;
        gridItems.forEach(item => {
          const r = item.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150 * -35;
            const tx = (dx / dist) * force;
            const ty = (dy / dist) * force;

            item.style.transition = 'transform 0.1s ease-out';
            item.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.15)`;
          } else {
            item.style.transition = 'transform 0.5s ease';
            item.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }
        });
      };

      document.addEventListener('mousemove', handleMouseMove);

      return { enableTimer, handleMouseMove };
    };

    let animationControls;
    const initialTimer = setTimeout(() => {
      animationControls = runAnimation();
    }, startDelay);

    // Cleanup listeners and timers on component unmount
    return () => {
      clearTimeout(initialTimer);
      if (animationControls) {
        clearTimeout(animationControls.enableTimer);
        document.removeEventListener('mousemove', animationControls.handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="dark websites-page font-polysans bg-[#141414] text-zinc-100 min-h-screen">
      {/* Inject original CSS styles natively to bypass PostCSS compiling errors */}
      <style dangerouslySetInnerHTML={{ __html: rawCss }} />

      {/* HTML Hero Section */}
      <div dangerouslySetInnerHTML={{ __html: HERO_HTML }} />
      
      {/* Future Website Content Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-32 text-center text-zinc-500 font-medium">
        Future website content will appear here.
      </div>
    </div>
  );
}
