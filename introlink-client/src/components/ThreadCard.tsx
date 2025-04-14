import React from 'react';
import { formatDistanceToNow } from 'date-fns';

// Define the props interface for the ThreadCard component
interface ThreadCardProps {
  id: string;
  title: string;
  body: string;
  replyCount: number;
  upvotes: number;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  onClick?: () => void;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  id,
  title,
  body,
  replyCount,
  upvotes,
  createdAt,
  user,
  onClick
}) => {
  // Create a truncated version of the body text
  const previewText = body.length > 120 ? `${body.substring(0, 120)}...` : body;
  
  // Format the date to be relative (e.g., "2 hours ago")
  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            {upvotes}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{previewText}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-6 h-6 rounded-full mr-2"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <span className="text-xs text-gray-500">{user.name.charAt(0)}</span>
            </div>
          )}
          <span>{user.name}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            {replyCount}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;