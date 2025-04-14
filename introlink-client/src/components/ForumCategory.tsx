import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, MessageSquare, ThumbsUp, Eye, Clock, ChevronDown } from 'lucide-react';

interface Thread {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  replies: number;
  views: number;
  likes: number;
  isPinned?: boolean;
  isLocked?: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  threadCount: number;
}

type SortOption = 'newest' | 'popular' | 'most-liked' | 'most-viewed';

const ForumCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Normally you would fetch this data from an API based on the categoryId
  const category: Category = {
    id: parseInt(categoryId || '1'),
    name: "Mental Health",
    description: "Discussions about mental health awareness, support, and resources",
    icon: "🧠",
    color: "bg-green-100",
    threadCount: 157
  };

  const threads: Thread[] = [
    {
      id: 1,
      title: "Tips for managing anxiety during stressful periods",
      author: "AnxietyAwareness",
      authorAvatar: "AA",
      content: "I've been developing some techniques that help me manage anxiety...",
      createdAt: "2025-04-10T14:30:00",
      replies: 28,
      views: 342,
      likes: 47,
      isPinned: true
    },
    {
      id: 2,
      title: "Depression resources that have helped me recover",
      author: "RecoveryJourney",
      authorAvatar: "RJ",
      content: "I wanted to share some resources that have been invaluable during my recovery...",
      createdAt: "2025-04-12T09:15:00",
      replies: 19,
      views: 215,
      likes: 36
    },
    {
      id: 3,
      title: "How to support a friend going through a mental health crisis",
      author: "SupportiveAlly",
      authorAvatar: "SA",
      content: "When someone you care about is struggling with their mental health...",
      createdAt: "2025-04-13T16:45:00",
      replies: 15,
      views: 178,
      likes: 29
    },
    {
      id: 4,
      title: "Meditation practices for daily mental wellness",
      author: "MindfulMoments",
      authorAvatar: "MM",
      content: "Incorporating meditation into your daily routine can significantly improve...",
      createdAt: "2025-04-08T11:20:00",
      replies: 32,
      views: 410,
      likes: 51
    },
    {
      id: 5,
      title: "Seeking advice: How to talk to family about therapy",
      author: "TherapyNewbie",
      authorAvatar: "TN",
      content: "I've decided to start therapy but I'm nervous about discussing it with my family...",
      createdAt: "2025-04-11T13:50:00",
      replies: 24,
      views: 267,
      likes: 33
    },
    {
      id: 6,
      title: "Success stories: Overcoming mental health challenges",
      author: "HopefulFuture",
      authorAvatar: "HF",
      content: "I thought it might be helpful to create a thread where we can share success stories...",
      createdAt: "2025-04-05T10:30:00",
      replies: 43,
      views: 529,
      likes: 87
    },
    {
      id: 7,
      title: "Mental health apps review thread",
      author: "TechForWellness",
      authorAvatar: "TW",
      content: "I've tried several mental health apps over the past year and wanted to share my thoughts...",
      createdAt: "2025-04-09T18:15:00",
      replies: 26,
      views: 312,
      likes: 41,
      isLocked: true
    }
  ];

  // Sort threads based on the selected option
  const sortedThreads = [...threads].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.replies - a.replies;
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-viewed':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  // Pinned threads always appear first
  const pinnedThreads = sortedThreads.filter(thread => thread.isPinned);
  const regularThreads = sortedThreads.filter(thread => !thread.isPinned);
  const displayThreads = [...pinnedThreads, ...regularThreads];

  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb & Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <Link to="/forum" className="flex items-center gap-1 hover:text-blue-600">
            <ArrowLeft size={16} />
            <span>Back to Forums</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-700">{category.name}</span>
        </div>
        
        <div className={`${category.color} p-6 rounded-lg shadow-sm`}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{category.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-gray-600 mt-1">{category.description}</p>
              <div className="mt-2 text-sm text-gray-500">{category.threadCount} threads in this category</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <PlusCircle size={20} />
              <span>New Thread</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Threads</h2>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="flex items-center gap-2">
              {sortBy === 'newest' && <Clock size={16} />}
              {sortBy === 'popular' && <MessageSquare size={16} />}
              {sortBy === 'most-liked' && <ThumbsUp size={16} />}
              {sortBy === 'most-viewed' && <Eye size={16} />}
              
              {sortBy === 'newest' && 'Most Recent'}
              {sortBy === 'popular' && 'Most Replies'}
              {sortBy === 'most-liked' && 'Most Liked'}
              {sortBy === 'most-viewed' && 'Most Viewed'}
            </span>
            <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setSortBy('newest');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Clock size={16} />
                    <span>Most Recent</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setSortBy('popular');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <MessageSquare size={16} />
                    <span>Most Replies</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setSortBy('most-liked');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <ThumbsUp size={16} />
                    <span>Most Liked</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setSortBy('most-viewed');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Eye size={16} />
                    <span>Most Viewed</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Threads List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {displayThreads.map((thread, index) => (
          <div 
            key={thread.id}
            className={`${index !== displayThreads.length - 1 ? 'border-b border-gray-200' : ''} ${thread.isPinned ? 'bg-blue-50' : 'hover:bg-gray-50'} transition`}
          >
            <div className="p-5">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
                    {thread.authorAvatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {thread.isPinned && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Pinned</span>
                    )}
                    {thread.isLocked && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">Locked</span>
                    )}
                    <Link 
                      to={`/thread/${thread.id}`} 
                      className="text-lg font-medium text-gray-800 hover:text-blue-600"
                    >
                      {thread.title}
                    </Link>
                  </div>
                  <div className="text-gray-500 text-sm">
                    Posted by <span className="font-medium text-gray-700">{thread.author}</span> on {formatDate(thread.createdAt)}
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-2">{thread.content}</p>
                  
                  <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{thread.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{thread.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{thread.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">3</button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">10</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ForumCategoryPage;