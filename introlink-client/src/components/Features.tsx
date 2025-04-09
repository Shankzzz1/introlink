import React from 'react';
import { FaBrain, FaComments, FaBook, FaShieldAlt, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';

const Features: React.FC = () => {
  // Feature data to make it easier to map through
  const features = [
    {
      icon: <FaBrain size={48} className="text-blue-600" />,
      title: "AI Icebreaker",
      description: "Helps start conversations without pressure"
    },
    {
      icon: <FaComments size={48} className="text-blue-600" />,
      title: "Forum Spaces",
      description: "Topic-based community discussions"
    },
    {
      icon: <FaBook size={48} className="text-blue-600" />,
      title: "Private Journal",
      description: "Your personal, safe place to write and reflect"
    },
    {
      icon: <FaShieldAlt size={48} className="text-blue-600" />,
      title: "Calm Chatroom",
      description: "No noise, just safe and respectful communication"
    },
    {
      icon: <FaUserFriends size={48} className="text-blue-600" />,
      title: "Introvert Community",
      description: "Connect with like-minded individuals at your own pace"
    },
    {
      icon: <FaCalendarAlt size={48} className="text-blue-600" />,
      title: "Mindful Events",
      description: "Virtual gatherings designed for quiet engagement"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features Designed for Introverts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tools and spaces that respect your need for thoughtful interaction and personal expression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Map through features array to generate cards */}
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;