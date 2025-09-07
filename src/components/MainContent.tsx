import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

interface MainContentProps {
  onReplay: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onReplay }) => {
  return (
    <div className="bg-slate-900">
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
       <div className="text-center pb-8 bg-gradient-to-r from-blue-500 to-teal-500">
            <button
            onClick={onReplay}
            className="group relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-500 transform hover:scale-110 text-lg shadow-lg"
            >
            <span className="relative z-10">Replay Intro</span>
            </button>
        </div>
    </div>
  );
};

export default MainContent;