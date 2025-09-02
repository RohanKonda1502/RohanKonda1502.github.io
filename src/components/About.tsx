import React from 'react';

const About: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-6">About Me</h2>
                <p className="text-lg leading-relaxed mb-4">
                    I am a creative professional with a passion for design and technology. My journey in the creative field has equipped me with a diverse skill set that allows me to bring ideas to life through innovative solutions.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    With a background in graphic design and web development, I strive to create visually appealing and user-friendly experiences. I believe in the power of collaboration and continuous learning, which drives me to stay updated with the latest trends and technologies.
                </p>
                <p className="text-lg leading-relaxed">
                    When I'm not working on projects, you can find me exploring new design inspirations, experimenting with new tools, or enjoying the great outdoors.
                </p>
            </div>
        </section>
    );
};

export default About;