import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Types
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock API function - replace with your actual API calls
const fetchJournalEntry = async (id: string): Promise<JournalEntry> => {
  // In a real app, fetch from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'My Journal Entry',
        content: 'This is the content of my journal entry.',
        tags: ['personal', 'thoughts'],
        isPrivate: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

// Mock update function - replace with your actual API calls
const updateJournalEntry = async (entry: JournalEntry): Promise<JournalEntry> => {
  // In a real app, send to your API
  console.log('Updating entry:', entry);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...entry,
        updatedAt: new Date().toISOString(),
      });
    }, 500);
  });
};

const EditJournalEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  
  // Fetch the existing journal entry
  useEffect(() => {
    const loadEntry = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const entry = await fetchJournalEntry(id);
        
        setTitle(entry.title);
        setContent(entry.content);
        setTags(entry.tags);
        setIsPrivate(entry.isPrivate);
      } catch (err) {
        setError('Failed to load journal entry. Please try again.');
        console.error('Error loading entry:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEntry();
  }, [id]);
  
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim().toLowerCase();
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!id) return;
    
    try {
      setIsSaving(true);
      setError(null);
      
      await updateJournalEntry({
        id,
        title,
        content,
        tags,
        isPrivate,
        createdAt: new Date().toISOString(), // This would come from the server in a real app
        updatedAt: new Date().toISOString(),
      });
      
      // Navigate back to the journal entry detail page or journal list
      navigate(`/journal/${id}`);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error('Error updating entry:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading journal entry...</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Journal Entry</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a title for your journal entry"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Write your thoughts here..."
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div 
                key={tag} 
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md flex items-center"
              >
                <span>{tag}</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add tags (press Enter)"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
              Make this entry private
            </label>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJournalEntry;