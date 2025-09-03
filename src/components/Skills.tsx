import React, { useRef, useLayoutEffect, useState } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { FaPython } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { TbRobot, TbSparkles } from "react-icons/tb";

interface VelocityMapping {
    input: [number, number];
    output: [number, number];
}

interface VelocityTextProps {
    children: React.ReactNode;
    baseVelocity: number;
    scrollContainerRef?: React.RefObject<HTMLElement>;
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

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [ref]);

    return width;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
    scrollContainerRef,
    texts = [],
    velocity = 5,
    className = '',
    damping = 50,
    stiffness = 400,
    numCopies = 6,
    velocityMapping = { input: [0, 1000], output: [0, 5] },
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
}) => {
    return (
        <div>
            {texts.map((text: React.ReactNode, index: number) => (
                <VelocityText
                    key={index}
                    className={className}
                    baseVelocity={index % 2 !== 0 ? -velocity : velocity} // Use the velocity from ScrollVelocity's props
                    scrollContainerRef={scrollContainerRef}
                    damping={damping}
                    stiffness={stiffness}
                    numCopies={numCopies}
                    velocityMapping={velocityMapping}
                    parallaxClassName={parallaxClassName}
                    scrollerClassName={scrollerClassName}
                    parallaxStyle={parallaxStyle}
                    scrollerStyle={scrollerStyle}
                >
                    {text}&nbsp;
                </VelocityText>
            ))}
        </div>
    );
};

// Extracted VelocityText component
const VelocityText: React.FC<VelocityTextProps> = React.memo(({
    children,
    baseVelocity, // No default here, it's expected from parent
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies = 6, // Provide a default here for robustness
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
}) => {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: damping ?? 50,
        stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
        smoothVelocity,
        velocityMapping?.input || [0, 1000],
        velocityMapping?.output || [0, 5],
        { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    // Utility function for wrapping values
    const wrap = (min: number, max: number, v: number): number => {
        const range = max - min;
        const mod = (((v - min) % range) + range) % range;
        return mod + min;
    };

    const x = useTransform(baseX, v => {
        if (copyWidth === 0) return '0px';
        return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies; i++) { // numCopies is now guaranteed to have a default
        spans.push(
            <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
                {children}
            </span>
        );
    }

    return (
        <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
            <motion.div
                className={`${scrollerClassName} flex whitespace-nowrap text-center font-sans text-3xl font-bold tracking-[-0.02em] drop-shadow md:text-4xl`}
                style={{ x, ...scrollerStyle }}
            >
                {spans}
            </motion.div>
        </div>
    );
});

const Skills: React.FC = () => {
    const skillsData = [
        { name: 'Python', icon: FaPython },
        { name: 'MySQL', icon: SiMysql },
        { name: 'Artificial Intelligence', icon: TbRobot },
        { name: 'Prompt Engineering', icon: TbSparkles }
    ];

    // Split skills into two lines for the scrolling effect
    const renderSkillsLine = (skills: typeof skillsData) => (
        <>
            {skills.map(({ name, icon: Icon }) => (
                <span key={name} className="inline-flex items-center mx-6">
                    <Icon className="text-3xl md:text-4xl" />
                    <span className="ml-3">{name}</span>
                    <span className="ml-6 font-sans">•</span>
                </span>
            ))}
        </>
    );

    const midPoint = Math.ceil(skillsData.length / 2);
    const scrollingTexts = [
        renderSkillsLine(skillsData.slice(0, midPoint)),
        renderSkillsLine(skillsData.slice(midPoint))
    ];

    return (
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-20 overflow-hidden">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-12">My Skills</h2>
                <ScrollVelocity texts={scrollingTexts} velocity={2} scrollerClassName="text-white" />
            </div>
        </section>
    );
};

export default Skills;