import React from 'react';

const skillsData = [
    { skill: 'JavaScript', icon: '🟡' },
    { skill: 'TypeScript', icon: '🔵' },
    { skill: 'React', icon: '⚛️' },
    { skill: 'Tailwind CSS', icon: '🌊' },
    { skill: 'Node.js', icon: '🟢' },
    { skill: 'GraphQL', icon: '🔗' },
];

const Skills: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-8">My Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skillsData.map((skill, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                            <div className="text-5xl mb-4">{skill.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">{skill.skill}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;