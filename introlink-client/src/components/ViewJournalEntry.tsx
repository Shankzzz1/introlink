import { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Star, 
  Share2, 
  Lock, 
  Calendar, 
  Clock
} from 'lucide-react';

// Types
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isPrivate: boolean;
  isFavorite: boolean;
}

// Mock data for demonstration
const mockEntry: JournalEntry = {
  id: '123',
  title: 'Reflecting on Personal Growth',
  content: `## Looking Back

Over the past few months, I've noticed a significant change in how I approach challenges. Rather than immediately seeking solutions, I'm taking more time to understand the problem first.

### Key Insights

- **Patience is valuable**: Taking time to reflect leads to better decisions
- **Small steps matter**: Incremental progress adds up over time
- **Consistency beats intensity**: Daily small efforts outperform occasional heroics

> "The journey of a thousand miles begins with a single step." - Lao Tzu

This mindset shift has helped me both professionally and personally. At work, I'm more deliberate in my decision-making process, and at home, I'm more present and mindful.

## Moving Forward

I want to continue nurturing this growth by:
1. Journaling daily (even if briefly)
2. Reading more broadly
3. Seeking feedback from trusted friends

![](https://example.com/placeholder-image.jpg)

Tomorrow I'll set specific goals for the next month that align with these reflections.`,
  createdAt: '2025-04-28T09:15:30Z',
  updatedAt: '2025-04-28T14:22:45Z',
  tags: ['Personal Growth', 'Reflection', 'Mindfulness'],
  isPrivate: true,
  isFavorite: true
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to render markdown content
// In a real implementation, you would use a library like react-markdown
const renderMarkdown = (content: string): React.ReactNode => {
  // This is a simplified implementation for demonstration
  // In a real app, you would use a proper markdown renderer
  
  // Replace headings
  let formattedContent = content
    .replace(/## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/### (.*$)/gm, '<h3 class="text-lg font-bold mt-3 mb-2">$1</h3>')
    
    // Replace bold and italic
    .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
    .replace(/\_(.*?)\_/gm, '<em>$1</em>')
    
    // Replace blockquotes
    .replace(/\> (.*$)/gm, '<blockquote class="pl-4 border-l-4 border-gray-300 italic text-gray-700 my-2">$1</blockquote>')
    
    // Replace lists
    .replace(/^\- (.*$)/gm, '<li class="ml-6">$1</li>')
    .replace(/<\/li>\n<li/gm, '</li><li')
    .replace(/<li(.*?)<\/li>/gs, '<ul class="list-disc my-2">$&</ul>')
    
    // Replace numbered lists
    .replace(/^\d\. (.*$)/gm, '<li class="ml-6">$1</li>')
    
    // Replace paragraphs
    .replace(/^(?!<[h|u|b|l|o])(.*$)/gm, '<p class="my-2">$1</p>');
  
  // Return as HTML
  return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
};

interface ViewJournalEntryProps {
  entry?: JournalEntry;
  onBack?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
}

const ViewJournalEntry = ({ 
  entry = mockEntry,
  onBack,
  onEdit,
  onDelete,
  onToggleFavorite,
  onShare
}: ViewJournalEntryProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Handle back button
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      console.log('Navigate back');
    }
  };
  
  // Handle edit
  const handleEdit = () => {
    if (onEdit) {
      onEdit(entry.id);
    } else {
      console.log('Edit entry', entry.id);
    }
  };
  
  // Handle delete
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    if (onDelete) {
      onDelete(entry.id);
    } else {
      console.log('Delete entry', entry.id);
    }
    setIsDeleteModalOpen(false);
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(entry.id);
    } else {
      console.log('Toggle favorite', entry.id);
    }
  };
  
  // Handle share
  const handleShare = () => {
    if (entry.isPrivate) {
      return; // Can't share private entries
    }
    
    if (onShare) {
      onShare(entry.id);
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };
  
  // Calculate how long ago the entry was updated
  const getUpdateTimeAgo = (): string => {
    const now = new Date();
    const updated = new Date(entry.updatedAt);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  // Delete confirmation modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Delete Journal Entry</h3>
        <p className="mb-6">Are you sure you want to delete this entry? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  
  // Share options popup
  const ShareOptions = () => (
    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-3 w-48 z-10">
      <button
        onClick={() => console.log('Copy link')}
        className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
        type="button"
      >
        Copy link
      </button>
      <button
        onClick={() => console.log('Share via email')}
        className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
        type="button"
      >
        Email
      </button>
      <button
        onClick={() => console.log('Share to social media')}
        className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
        type="button"
      >
        Social media
      </button>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Back button and title */}
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
          type="button"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex-grow">{entry.title}</h1>
      </div>
      
      {/* Metadata and tags */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
        {/* Created date */}
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>{formatDate(entry.createdAt)}</span>
        </div>
        
        {/* Last edited */}
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>Updated {getUpdateTimeAgo()}</span>
        </div>
        
        {/* Privacy indicator */}
        {entry.isPrivate && (
          <div className="flex items-center text-indigo-600">
            <Lock size={16} className="mr-1" />
            <span>Private</span>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {entry.tags.map(tag => (
            <span 
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap mb-6 gap-2">
        {/* Edit button */}
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          type="button"
        >
          <Edit size={16} className="mr-2" />
          Edit
        </button>
        
        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          type="button"
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </button>
        
        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm font-medium rounded-md ${
            entry.isFavorite 
              ? 'text-yellow-700 bg-yellow-50 border-yellow-200' 
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          }`}
          type="button"
        >
          <Star 
            size={16} 
            className="mr-2" 
            fill={entry.isFavorite ? "currentColor" : "none"} 
          />
          {entry.isFavorite ? 'Favorited' : 'Favorite'}
        </button>
        
        {/* Share button (only for public entries) */}
        <div className="relative">
          <button
            onClick={handleShare}
            disabled={entry.isPrivate}
            className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
              entry.isPrivate
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
            type="button"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </button>
          
          {showShareOptions && !entry.isPrivate && <ShareOptions />}
        </div>
      </div>
      
      {/* Entry content */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="prose prose-indigo max-w-none">
          {renderMarkdown(entry.content)}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {isDeleteModalOpen && <DeleteModal />}
    </div>
  );
};

export default ViewJournalEntry;