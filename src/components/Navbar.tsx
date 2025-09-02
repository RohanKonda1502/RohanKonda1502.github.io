import React from 'react';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 bg-white shadow-md z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-2xl font-bold text-deep-blue">My Portfolio</div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="hero" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="about" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="skills" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link to="projects" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="testimonials" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            Testimonials
                        </Link>
                    </li>
                    <li>
                        <Link to="contact" smooth={true} duration={500} className="text-soft-purple hover:text-teal cursor-pointer">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;