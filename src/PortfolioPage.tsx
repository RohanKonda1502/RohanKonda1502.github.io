import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

interface PortfolioPageProps {
  onReplay: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onReplay }) => {
  return (
    <div className="bg-rose-pine-base">
      <Navbar />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
       <div className="text-center pb-8 bg-rose-pine-overlay">
            <button
            onClick={onReplay}
            className="group relative bg-gradient-to-r from-rose-pine-foam via-rose-pine-iris to-rose-pine-rose hover:from-rose-pine-foam/80 hover:via-rose-pine-iris/80 hover:to-rose-pine-rose/80 text-rose-pine-base font-bold py-2 px-6 rounded-xl transition-all duration-500 transform hover:scale-110 text-lg shadow-lg"
            >
            <span className="relative z-10">Replay Intro</span>
            </button>
        </div>
    </div>
  );
};

export default PortfolioPage;