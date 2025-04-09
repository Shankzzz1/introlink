import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why IntroLink?
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              IntroLink is a peaceful social space for introverts who prefer thoughtful, 
              low-pressure conversations, journaling, and safe expression.
            </p>
          </div>
        </div>
        
        {/* Optional: Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thoughtful Conversations</h3>
            <p className="text-gray-600">
              Engage in meaningful discussions without the pressure of quick responses or social anxiety.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personal Journaling</h3>
            <p className="text-gray-600">
              Express yourself through private or shared journals in a safe, judgment-free environment.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe Expression</h3>
            <p className="text-gray-600">
              A protected space where introverts can share ideas and feelings without fear or overwhelm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;