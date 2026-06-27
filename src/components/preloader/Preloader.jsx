import React, { useEffect, useState } from 'react';
import './preloader.css';

const Preloader = ({ onComplete }) => {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 4550;

    function smootherEase(t) {
      if (t < 0.72) {
        return 0.76 * (1 - Math.pow(1 - t / 0.72, 3));
      }
      const tail = (t - 0.72) / 0.28;
      return 0.76 + 0.24 * (tail * tail * (3 - 2 * tail));
    }

    let current = 0;
    let frameId;

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const target = Math.round(smootherEase(p) * 100);
      current += (target - current) * 0.18;
      
      setDisplayVal(p >= 1 ? 100 : Math.round(current));

      if (p < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    // Unmount after exit animations complete (6.5s)
    const timeoutId = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  return (
    <>
      <div className="preloader">
        <div className="counter-wrap">
          <div className="label">Ref.</div>
          <div className="counter">{displayVal}</div>
          <div className="label right">Design.</div>
        </div>
      </div>
      <div className="wipe"></div>
    </>
  );
};

export default Preloader;
