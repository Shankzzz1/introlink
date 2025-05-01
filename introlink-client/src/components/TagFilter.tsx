import { useState, useEffect } from 'react';
import { Tag, X, ChevronDown, ChevronUp } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagDeselect: (tag: string) => void;
  onClearAll: () => void;
  variant?: 'sidebar' | 'dropdown';
}

const TagFilter = ({
  tags,
  selectedTags,
  onTagSelect,
  onTagDeselect,
  onClearAll,
  variant = 'sidebar'
}: TagFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
  
  // In a real application, you would fetch tag counts from your API
  useEffect(() => {
    // Mock tag counts - replace with actual data in your implementation
    const mockTagCounts: Record<string, number> = {};
    tags.forEach(tag => {
      mockTagCounts[tag] = Math.floor(Math.random() * 10) + 1; // Random count between 1-10
    });
    setTagCounts(mockTagCounts);
  }, [tags]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagDeselect(tag);
    } else {
      onTagSelect(tag);
    }
  };
  
  const renderTagList = () => (
    <div className="space-y-1">
      {tags.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No tags available</p>
      ) : (
        tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
              selectedTags.includes(tag) 
                ? 'bg-indigo-100 text-indigo-800 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Tag size={14} className="mr-2" />
              <span>{tag}</span>
            </div>
            <span className="text-xs text-gray-500">{tagCounts[tag] || 0}</span>
          </button>
        ))
      )}
    </div>
  );
  
  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Filter by Tags</h3>
          {selectedTags.length > 0 && (
            <button 
              onClick={onClearAll}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Clear all
            </button>
          )}
        </div>
        
        {selectedTags.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Selected Tags:</p>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map(tag => (
                <div 
                  key={tag}
                  className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center"
                >
                  <span>{tag}</span>
                  <button 
                    onClick={() => onTagDeselect(tag)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {renderTagList()}
      </div>
    );
  }
  
  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <div className="flex items-center">
          <Tag size={16} className="mr-2" />
          <span>{selectedTags.length ? `${selectedTags.length} tag(s) selected` : 'Filter by tags'}</span>
        </div>
        {isOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2">
            {selectedTags.length > 0 && (
              <div className="mb-2 pb-2 border-b border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-gray-500">Selected Tags:</p>
                  <button 
                    onClick={onClearAll}
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map(tag => (
                    <div 
                      key={tag}
                      className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      <span>{tag}</span>
                      <button 
                        onClick={() => onTagDeselect(tag)}
                        className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto">
              {renderTagList()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;