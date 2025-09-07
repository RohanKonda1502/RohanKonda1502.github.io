import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-rose-pine-overlay text-rose-pine-text py-6">
            <div className="container mx-auto text-center">
                <p className="mb-4">Connect with me on social media:</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-pine-foam">Twitter</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-pine-foam">LinkedIn</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-pine-foam">GitHub</a>
                </div>
                <p className="text-sm">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;