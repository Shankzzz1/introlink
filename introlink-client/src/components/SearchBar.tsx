import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  debounceTime?: number;
}

const SearchBar = ({
  onSearch,
  placeholder = 'Search journals...',
  initialQuery = '',
  className = '',
  debounceTime = 300
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search to avoid excessive filtering on each keystroke
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, onSearch, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative w-full ${className}`}
    >
      <div className={`flex items-center w-full rounded-lg border ${
        isFocused 
          ? 'border-indigo-500 ring-2 ring-indigo-100'
          : 'border-gray-300'
      } bg-white overflow-hidden transition-all duration-200`}>
        <div className="flex items-center justify-center pl-3 text-gray-400">
          <Search size={18} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-2 px-3 text-gray-700 focus:outline-none"
          aria-label="Search journals"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Optional search results preview would go here */}
    </form>
  );
};

// Example of how to use this component in JournalHomePage
const ExampleUsage = () => {
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // This would be your actual filtering logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Example filtering logic - would be replaced with your actual implementation
    // fetchJournals({ search: query }) or filter client-side
    console.log(`Searching for: ${query}`);
  };
  
  return (
    <div>
      <SearchBar 
        onSearch={handleSearch}
        placeholder="Search journal entries..." 
      />
      
      {/* Rest of your JournalHomePage content */}
    </div>
  );
};

export default SearchBar;