import React from 'react';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-rose-pine-base text-rose-pine-text">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 animate-pulse text-rose-pine-love">Welcome to My Portfolio</h1>
                <p className="text-lg mb-8 text-rose-pine-subtle">I am a creative professional specializing in modern design.</p>
                <Link
                    to="about" smooth={true} duration={500}
                    className="bg-rose-pine-iris text-rose-pine-base px-6 py-2 rounded-full hover:bg-rose-pine-rose transition duration-300 cursor-pointer"
                >
                    Learn More
                </Link>
            </div>
        </section>
    );
};

export default Hero;