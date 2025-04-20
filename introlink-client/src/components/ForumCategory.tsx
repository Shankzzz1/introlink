import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  PlusCircle, ArrowLeft, MessageSquare, ThumbsUp,
  Eye, Clock, ChevronDown
} from 'lucide-react';

interface Thread {
  _id: string;
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
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  threadCount: number;
}

type SortOption = 'newest' | 'popular' | 'most-liked' | 'most-viewed';

const ForumCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, threadsRes] = await Promise.all([
          axios.get(`/api/categories/${categoryId}`),
          axios.get(`/api/categories/${categoryId}/threads?sort=${sortBy}`)
        ]);

        setCategory(catRes.data);
        setThreads(threadsRes.data);
      } catch (error) {
        console.error('Error loading category or threads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, sortBy]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const pinnedThreads = threads.filter(thread => thread.isPinned);
  const regularThreads = threads.filter(thread => !thread.isPinned);
  const displayThreads = [...pinnedThreads, ...regularThreads];

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (!category) {
    return <div className="text-center py-10 text-red-500">Category not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Breadcrumbs */}
      <div className="flex items-center mb-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900 ml-4">{category.name}</h1>
      </div>
      <div className="mb-6 text-gray-600 text-sm">
        {category.description}
      </div>

      {/* Sort Dropdown */}
      <div className="relative mb-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-sm text-gray-500 flex items-center gap-2"
        >
          Sort by: <span className="font-medium">{sortBy}</span>
          <ChevronDown size={16} />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-8 left-0 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
            {(['newest', 'popular', 'most-liked', 'most-viewed'] as SortOption[]).map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setIsDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Threads List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {displayThreads.length === 0 ? (
          <div className="p-6 text-gray-500">No threads found in this category.</div>
        ) : (
          displayThreads.map((thread, index) => (
            <div
              key={thread._id}
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
                        to={`/thread/${thread._id}`}
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
          ))
        )}
      </div>
    </div>
  );
};

export default ForumCategoryPage;
