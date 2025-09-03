import React, { useRef, useLayoutEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import {
  FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub,
  FaBug, FaTerminal, FaCodeBranch, FaCogs
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiExpress, SiPython, SiMysql
} from 'react-icons/si';
import { TbApi } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";

const skills = [
  "Python", "JavaScript", "TypeScript", "HTML", "CSS", "TailwindCSS", "Bash", "MySQL", "Tkinter", "Git", "GitHub", "GitHub Actions", "VS Code",
  "REST APIs", "GitHub Pages", "Node.js", "Express.js", "Open-source collaboration", "Debugging", "CI/CD workflows"
];

const skillIconMap: Record<string, React.ReactNode> = {
  Python: <FaPython className="text-yellow-300" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-300" />,
  HTML: <FaHtml5 className="text-orange-400" />,
  CSS: <FaCss3Alt className="text-blue-400" />,
  TailwindCSS: <SiTailwindcss className="text-cyan-300" />,
  Bash: <FaTerminal className="text-green-300" />,
  MySQL: <SiMysql className="text-blue-500" />,
  Tkinter: <SiPython className="text-yellow-200" />,
  Git: <FaGitAlt className="text-orange-500" />,
  GitHub: <FaGithub />,
  "GitHub Actions": <FaCodeBranch className="text-blue-400" />,
  "VS Code": <FaTerminal className="text-blue-400" />,
  "REST APIs": <TbApi className="text-emerald-300" />,
  "GitHub Pages": <FaGithub className="text-purple-300" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Express.js": <SiExpress className="text-gray-100" />,
  "Open-source collaboration": <FaCogs className="text-green-200" />,
  Debugging: <FaBug className="text-red-400" />,
  "CI/CD workflows": <MdSecurity className="text-yellow-400" />,
};

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
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [ref]);

    return width;
}

const VelocityText: React.FC<VelocityTextProps> = React.memo(({
    children,
    baseVelocity,
    scrollContainerRef,
    className = '',
    damping = 50,
    stiffness = 400,
    numCopies = 4,
    velocityMapping = { input: [0, 1000], output: [0, 5] },
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
        damping: damping,
        stiffness: stiffness,
    });
    const velocityFactor = useTransform(
        smoothVelocity,
        velocityMapping.input,
        velocityMapping.output,
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
    for (let i = 0; i < numCopies; i++) {
        spans.push(
            <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
                {children}
            </span>
        );
    }

    return (
        <div className={`${parallaxClassName} relative overflow-hidden`} style={parallaxStyle}>
            <motion.div
                className={`${scrollerClassName} flex whitespace-nowrap`}
                style={{ x, ...scrollerStyle }}
            >
                {spans}
            </motion.div>
        </div>
    );
});

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 25,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 4,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  return (
    <div>
      {texts.map((text: React.ReactNode, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
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
          {text}
        </VelocityText>
      ))}
    </div>
  );
};

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400';

const Skills: React.FC = () => {
  const half = Math.ceil(skills.length / 2);
  const skills1 = skills.slice(0, half);
  const skills2 = skills.slice(half);

  const renderSkills = (skillList: string[]) => (
    <React.Fragment>
      {skillList.map((skill) => {
        const icon = skillIconMap[skill] || null;
        return (
          <span
            key={skill}
            className={`inline-flex items-center gap-2 bg-foreground/10 text-foreground px-4 py-2 rounded-full text-base font-space-grotesk ${gradientTextClass} mx-2`}
            title={skill}
          >
            {icon}
            <span>{skill}</span>
          </span>
        );
      })}
    </React.Fragment>
  );

  const skillSets = [renderSkills(skills1), renderSkills(skills2)];

  return (
    <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-20 overflow-hidden">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-12">My Skills</h2>
            <div className="w-full space-y-4">
                <ScrollVelocity texts={skillSets} velocity={25} className="flex" />
            </div>
        </div>
    </section>
  );
};

export default React.memo(Skills);