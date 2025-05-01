import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Tag, Plus, X } from 'lucide-react';

// Simple implementation of a rich text editor with basic formatting
const SimpleRichEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const [isFocused, setIsFocused] = useState(false);

  const applyFormatting = (format: string) => {
    // This is a simplified implementation
    // In a real app, you'd use a proper rich text editor library
    let updatedValue = value;
    
    switch (format) {
      case 'bold':
        updatedValue += '**Bold text**';
        break;
      case 'italic':
        updatedValue += '_Italic text_';
        break;
      case 'heading':
        updatedValue += '\n## Heading';
        break;
      case 'list':
        updatedValue += '\n- List item 1\n- List item 2';
        break;
      default:
        break;
    }
    
    onChange(updatedValue);
  };

  return (
    <div className={`border rounded-md overflow-hidden transition-all ${isFocused ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex space-x-2">
        <button 
          onClick={() => applyFormatting('bold')}
          className="p-1 rounded hover:bg-gray-200"
          title="Bold"
          type="button"
        >
          <span className="font-bold">B</span>
        </button>
        <button 
          onClick={() => applyFormatting('italic')}
          className="p-1 rounded hover:bg-gray-200"
          title="Italic"
          type="button"
        >
          <span className="italic">I</span>
        </button>
        <button 
          onClick={() => applyFormatting('heading')}
          className="p-1 rounded hover:bg-gray-200"
          title="Heading"
          type="button"
        >
          <span className="font-bold">H</span>
        </button>
        <button 
          onClick={() => applyFormatting('list')}
          className="p-1 rounded hover:bg-gray-200"
          title="List"
          type="button"
        >
          <span className="font-bold">• List</span>
        </button>
      </div>
      
      {/* Editor area */}
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Write your journal entry here... (Supports markdown formatting)"
        className="w-full p-4 min-h-[300px] focus:outline-none resize-y"
      />
      
      {/* Preview of markdown (in a real implementation) */}
      {value && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Preview</h4>
          <div className="prose prose-sm max-w-none">
            {/* In a real implementation, you would render markdown here */}
            <p className="text-gray-600">{value.substring(0, 150)}{value.length > 150 ? '...' : ''}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface CreateJournalEntryProps {
  onSave?: (entry: {
    title: string;
    content: string;
    tags: string[];
    isPrivate: boolean;
    date: string;
  }) => void;
  onCancel?: () => void;
}

const CreateJournalEntry = ({ onSave, onCancel }: CreateJournalEntryProps) => {
  // State for form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Suggested tags
  const suggestedTags = ['Gratitude', 'Work', 'Mood', 'Personal', 'Health', 'Goals', 'Ideas'];
  
  // Form validation
  useEffect(() => {
    setIsFormValid(!!title.trim() && !!content.trim());
  }, [title, content]);
  
  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // Handle selecting a suggested tag
  const handleSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle key press in tag input
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    const entry = {
      title: title.trim(),
      content: content.trim(),
      tags,
      isPrivate,
      date: new Date().toISOString(),
    };
    
    if (onSave) {
      onSave(entry);
    } else {
      console.log('Journal entry saved:', entry);
      // Reset form after saving
      setTitle('');
      setContent('');
      setTags([]);
      setIsPrivate(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <button 
          onClick={onCancel}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
          type="button"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">New Journal Entry</h1>
      </div>
      
      <div className="space-y-6">
        {/* Title input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        {/* Content editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Journal Entry
          </label>
          <SimpleRichEditor value={content} onChange={setContent} />
          {!content.trim() && (
            <p className="mt-1 text-sm text-red-500">Content is required</p>
          )}
        </div>
        
        {/* Tags section */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (Optional)
          </label>
          
          {/* Tag input */}
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="Add a tag..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} className="mr-1" />
              Add
            </button>
          </div>
          
          {/* Suggested tags */}
          {suggestedTags.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.filter(tag => !tags.includes(tag)).map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSuggestedTag(tag)}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    <Plus size={12} className="mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Selected tags */}
          {tags.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-indigo-500 hover:text-indigo-800 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Privacy checkbox */}
        <div className="flex items-center">
          <input
            id="private"
            name="private"
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="private" className="ml-2 block text-sm text-gray-900">
            Mark as private
          </label>
          <p className="ml-2 text-xs text-gray-500">
            (Private entries are only visible to you)
          </p>
        </div>
        
        {/* Submit buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} className="mr-2" />
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJournalEntry;