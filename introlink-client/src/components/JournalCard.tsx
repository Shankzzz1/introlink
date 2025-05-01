import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface JournalCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
}

const JournalCard = ({
  id,
  title,
  content,
  createdAt,
  tags,
  isFavorite = false,
  onToggleFavorite,
}: JournalCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  
  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Create a short preview of the content
  const contentPreview = content.length > 100 
    ? `${content.substring(0, 100)}...` 
    : content;
    
  // Handle toggling favorite status
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the journal entry
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);
    onToggleFavorite?.(id, newFavoriteStatus);
  };
  
  return (
    <Link 
      to={`/journal/${id}`} 
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200"
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{title}</h3>
          <button 
            onClick={handleFavoriteClick}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={`${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mb-2">
          {formatDate(createdAt)}
        </p>
        
        <p className="text-gray-600 mb-3 text-sm line-clamp-3">
          {contentPreview}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default JournalCard;