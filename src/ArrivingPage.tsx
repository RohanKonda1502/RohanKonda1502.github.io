import React, { useRef, useEffect } from 'react';
import { IntroAnimation } from './introAnimation';

interface ArrivingPageProps {
  onIntroFinish: () => void;
}

const ArrivingPage: React.FC<ArrivingPageProps> = ({ onIntroFinish }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const animation = new IntroAnimation(mountRef.current, onIntroFinish);
    animation.init();

    return () => {
      animation.cleanup();
    };
  }, [onIntroFinish]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-rose-pine-base">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* This overlay is shown before the animation starts. */}
      <div id="loading-overlay" className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-rose-pine-overlay/70 backdrop-blur-sm transition-opacity duration-1000">
        <p className="text-rose-pine-text text-2xl animate-pulse mb-8">Loading Experience...</p>
      </div>
    </div>
  );
};

export default ArrivingPage;