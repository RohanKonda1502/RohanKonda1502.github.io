import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">Connect with me on social media:</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
                <p className="text-sm">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;