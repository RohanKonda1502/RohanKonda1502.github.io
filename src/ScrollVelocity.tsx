import React from 'react';
import VelocityText from './VelocityText';

interface VelocityMapping {
    input: [number, number];
    output: [number, number];
}

interface ScrollVelocityProps {
    scrollContainerRef?: React.RefObject<HTMLElement>;
    texts: React.ReactNode[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: VelocityMapping;
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 25,
  className = "",
  ...rest
}) => {
  return (
    <div>
      {texts.map((text: React.ReactNode, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          {...rest}
        >
          {text}
        </VelocityText>
      ))}
    </div>
  );
};

export default ScrollVelocity;