import React, { useState } from 'react';
import { Search, PlusCircle, Flame, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  postCount: number;
  color: string;
}

interface Thread {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  lastActive: string;
  isHot?: boolean;
}

const ForumHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = [
    { 
      id: 1, 
      name: 'General Discussion', 
      description: 'Talk about anything and everything',
      icon: '💬',
      postCount: 1243,
      color: 'bg-blue-100'
    },
    { 
      id: 2, 
      name: 'Mental Health', 
      description: 'Get assistance with your questions',
      icon: '🧠',
      postCount: 867,
      color: 'bg-green-100'
    },
    { 
      id: 3, 
      name: 'News & Announcements', 
      description: 'Latest updates and information',
      icon: '📢',
      postCount: 456,
      color: 'bg-yellow-100'
    },
    { 
      id: 4, 
      name: 'Showcase', 
      description: 'Show off your work and projects',
      icon: '✨',
      postCount: 752,
      color: 'bg-purple-100'
    },
    { 
      id: 5, 
      name: 'Feedback', 
      description: 'Share your thoughts and suggestions',
      icon: '📝',
      postCount: 321,
      color: 'bg-pink-100'
    },
    { 
      id: 6, 
      name: 'Off-Topic', 
      description: 'Discussions not related to main topics',
      icon: '🎭',
      postCount: 987,
      color: 'bg-indigo-100'
    },
  ];

  const trendingThreads: Thread[] = [
    {
      id: 1,
      title: 'How to optimize React performance in large applications',
      author: 'ReactMaster',
      category: 'Help & Support',
      replies: 42,
      lastActive: '2 hours ago',
      isHot: true
    },
    {
      id: 2,
      title: 'Tailwind vs. CSS Modules - The ultimate showdown',
      author: 'CSSWizard',
      category: 'General Discussion',
      replies: 87,
      lastActive: '4 hours ago',
      isHot: true
    },
    {
      id: 3,
      title: 'Upcoming features in TypeScript 5.4',
      author: 'TypeScriptFan',
      category: 'News & Announcements',
      replies: 29,
      lastActive: '1 day ago'
    },
    {
      id: 4,
      title: 'Check out my new project built with Vite!',
      author: 'ViteEnthusiast',
      category: 'Showcase',
      replies: 15,
      lastActive: '3 hours ago'
    },
    {
      id: 5,
      title: 'What are your favorite VS Code extensions?',
      author: 'CodeEditor',
      category: 'General Discussion',
      replies: 53,
      lastActive: '5 hours ago',
      isHot: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <PlusCircle size={20} />
          <span>Create New Post</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="pl-4">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search threads..."
            className="w-full py-3 px-4 text-gray-700 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/forum/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
            >
              <div className={`${category.color} rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-60 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {category.postCount} posts
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Threads */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            <div className="flex items-center gap-2">
              <Flame size={24} className="text-orange-500" />
              <span>Trending Discussions</span>
            </div>
          </h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View all</a>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {trendingThreads.map((thread, index) => (
            <div 
              key={thread.id}
              className={`p-5 ${index !== trendingThreads.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 hover:text-blue-600">
                      {thread.title}
                    </h3>
                    {thread.isHot && (
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">Hot</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Posted by <span className="font-medium text-gray-700">{thread.author}</span> in <span className="text-blue-600">{thread.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare size={16} />
                    <span>{thread.replies}</span>
                  </div>
                  <div className="text-sm text-gray-500">{thread.lastActive}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForumHomePage;
