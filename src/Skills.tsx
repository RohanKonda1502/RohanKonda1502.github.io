import React from "react";
import {
  FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub,
  FaBug, FaTerminal, FaCodeBranch, FaCogs
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiExpress, SiPython, SiMysql
} from 'react-icons/si';
import { TbApi } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import ScrollVelocity from "./ScrollVelocity";

const skills = [
  "Python", "JavaScript", "TypeScript", "HTML", "CSS", "TailwindCSS", "Bash", "MySQL", "Tkinter", "Git", "GitHub", "GitHub Actions", "VS Code",
  "REST APIs", "GitHub Pages", "Node.js", "Express.js", "Open-source collaboration", "Debugging", "CI/CD workflows"
];

const skillIconMap: Record<string, React.ReactNode> = {
  Python: <FaPython className="text-rose-pine-gold" />,
  JavaScript: <FaJs className="text-rose-pine-gold" />,
  TypeScript: <SiTypescript className="text-rose-pine-foam" />,
  HTML: <FaHtml5 className="text-rose-pine-love" />,
  CSS: <FaCss3Alt className="text-rose-pine-foam" />,
  TailwindCSS: <SiTailwindcss className="text-rose-pine-foam" />,
  Bash: <FaTerminal className="text-rose-pine-pine" />,
  MySQL: <SiMysql className="text-rose-pine-foam" />,
  Tkinter: <SiPython className="text-rose-pine-gold" />,
  Git: <FaGitAlt className="text-rose-pine-love" />,
  GitHub: <FaGithub className="text-rose-pine-text" />,
  "GitHub Actions": <FaCodeBranch className="text-rose-pine-foam" />,
  "VS Code": <FaTerminal className="text-rose-pine-foam" />,
  "REST APIs": <TbApi className="text-rose-pine-pine" />,
  "GitHub Pages": <FaGithub className="text-rose-pine-iris" />,
  "Node.js": <FaNodeJs className="text-rose-pine-pine" />,
  "Express.js": <SiExpress className="text-rose-pine-subtle" />,
  "Open-source collaboration": <FaCogs className="text-rose-pine-pine" />,
  Debugging: <FaBug className="text-rose-pine-love" />,
  "CI/CD workflows": <MdSecurity className="text-rose-pine-gold" />,
};

const gradientTextClass = 'bg-clip-text text-transparent bg-gradient-to-r from-rose-pine-text to-rose-pine-subtle';

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
    <section className="bg-rose-pine-base py-20 overflow-hidden">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-rose-pine-text mb-12">My Skills</h2>
            <div className="w-full space-y-4">
                <ScrollVelocity texts={skillSets} velocity={25} className="flex" />
            </div>
        </div>
    </section>
  );
};

export default React.memo(Skills);