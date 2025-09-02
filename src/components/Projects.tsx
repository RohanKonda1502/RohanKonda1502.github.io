import React from 'react';

const projectsData = [
    {
        title: 'Project One',
        description: 'A brief description of Project One.',
        imageUrl: '/path/to/image1.jpg',
        link: 'https://example.com/project-one'
    },
    {
        title: 'Project Two',
        description: 'A brief description of Project Two.',
        imageUrl: '/path/to/image2.jpg',
        link: 'https://example.com/project-two'
    },
    {
        title: 'Project Three',
        description: 'A brief description of Project Three.',
        imageUrl: '/path/to/image3.jpg',
        link: 'https://example.com/project-three'
    },
    // Add more projects as needed
];

const Projects: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-10">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                                <p className="text-gray-600">{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-teal-500 hover:underline">
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;