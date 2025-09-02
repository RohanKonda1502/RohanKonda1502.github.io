import React from 'react';

const Hero: React.FC = () => {
    const scrollToSection = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 animate-pulse">Welcome to My Portfolio</h1>
                <p className="text-lg mb-8">I am a creative professional specializing in modern design.</p>
                <button 
                    className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300"
                    onClick={() => scrollToSection('about')}
                >
                    Learn More
                </button>
            </div>
        </section>
    );
};

export default Hero;