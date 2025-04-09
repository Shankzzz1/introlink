import React from 'react';
import Hero from "../assets/hero.png"

const HeroSection: React.FC = () => {
  const scrollToAbout = () => {
    // Find the about section by ID
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Text and buttons */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A Calm Space to Be Heard, <span className="text-blue-600">Not Loud.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Connect with introverts. Share, reflect, and grow.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Get Started
              </a>
              <button 
                onClick={scrollToAbout}
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="md:w-1/2">
            <img 
              src={Hero}
              alt="Calm illustration showing people connecting" 
              className="w-full "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;