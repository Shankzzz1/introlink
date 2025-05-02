import { useState } from 'react';
import Logo from "../assets/chat.png"

interface NavbarProps {
  logo?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo with adjusted size */}
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">Home</a>
            <a href="/forum" className="px-3 py-2 text-gray-700 hover:text-blue-600">Forums</a>
            <a href="/journal" className="px-3 py-2 text-gray-700 hover:text-blue-600">Journal</a>
            <a href="/AIChat" className="px-3 py-2 text-gray-700 hover:text-blue-600">AI Chat</a>
            <a href="/profile" className="px-3 py-2 text-gray-700 hover:text-blue-600">Profile</a>
          </div>

          {/* Login/Signup button (desktop) */}
          <div className="hidden md:flex items-center">
            <a href="#" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login / Signup
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state with animation */}
      <div 
        className={`
          md:hidden 
          transform 
          transition-all 
          duration-300 ease-in-out 
          ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} 
          overflow-hidden
        `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">Forums</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">Journal</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">AI Chat</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">Profile</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">Login / Signup</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;