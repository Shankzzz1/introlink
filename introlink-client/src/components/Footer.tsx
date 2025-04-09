import React from 'react';
import Logo from "../assets/chat.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column with logo and tagline */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <img src={Logo} alt="IntroLink Logo" className="h-8 w-auto mr-2 bg-white" />
              <span className="font-bold text-xl">IntroLink</span>
            </div>
            <div className="text-gray-400">
              <p>Where quiet</p>
              <p>voices are heard.</p>
            </div>
          </div>

          {/* Right column with links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* First column of links */}
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Journals</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms</a>
            </div>
            
            {/* Second column of links */}
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">About</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Forums</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy</a>
            </div>
            
            {/* Third column of links */}
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">AI Chat</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">GitHub</a>
            </div>
          </div>
        </div>
        
        {/* Copyright at bottom */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center md:text-left text-gray-400 text-sm">
          © 2025 IntroLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;