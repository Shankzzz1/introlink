import { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Star, Tag, Grid, List } from 'lucide-react';

// Types
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isFavorite: boolean;
}

// Mock data
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Morning Reflection',
    content: 'Today I woke up feeling refreshed and ready to tackle the day...',
    date: '2025-04-29',
    tags: ['morning', 'reflection'],
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: 'Ive been thinking about starting a new side project...',
    date: '2025-04-28',
    tags: ['ideas', 'projects'],
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Weekly Goals Review',
    content: 'Looking back at my goals for this week, Ive made progress on...',
    date: '2025-04-27',
    tags: ['goals', 'weekly'],
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Book Notes: Atomic Habits',
    content: 'Key takeaways from chapters 3-5: The importance of small habits...',
    date: '2025-04-25',
    tags: ['reading', 'books', 'notes'],
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Weekend Reflections',
    content: 'This weekend was quite relaxing. I managed to finish reading...',
    date: '2025-04-21',
    tags: ['weekend', 'reflection'],
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Gratitude List',
    content: 'Things Im grateful for today: 1. The sunny weather 2. Productive meeting...',
    date: '2025-04-20',
    tags: ['gratitude'],
    isFavorite: true,
  },
];

const JournalHomePage = () => {
  // State
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [allTags, setAllTags] = useState<string[]>([]);

  // Extract all unique tags
  useEffect(() => {
    const tags = mockEntries.flatMap(entry => entry.tags);
    const uniqueTags = Array.from(new Set(tags));
    setAllTags(uniqueTags);
  }, []);

  // Filter entries based on search and active filter
  useEffect(() => {
    let filtered = [...mockEntries];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply quick filters
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    switch (activeFilter) {
      case 'week':
        filtered = filtered.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= oneWeekAgo && entryDate <= today;
        });
        break;
      case 'favorites':
        filtered = filtered.filter(entry => entry.isFavorite);
        break;
      case 'all':
      default:
        // No additional filtering
        break;
    }
    
    setEntries(filtered);
  }, [searchQuery, activeFilter]);

  // Filter by tag
  const filterByTag = (tag: string) => {
    setSearchQuery(tag);
    setActiveFilter('all'); // Reset other filters
  };

  // Create a new entry (would connect to actual functionality)
  const createNewEntry = () => {
    alert('Open new entry editor!');
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    );
    setEntries(updatedEntries);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Journal</h1>
          <button
            onClick={createNewEntry}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus size={20} className="mr-2" />
            New Entry
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries by title, content or tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-md ${
                activeFilter === 'all' 
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All Entries
            </button>
            <button
              onClick={() => setActiveFilter('week')}
              className={`px-3 py-1 rounded-md flex items-center ${
                activeFilter === 'week' 
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Calendar size={16} className="mr-1" />
              This Week
            </button>
            <button
              onClick={() => setActiveFilter('favorites')}
              className={`px-3 py-1 rounded-md flex items-center ${
                activeFilter === 'favorites' 
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Star size={16} className="mr-1" />
              Favorites
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium mb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => filterByTag(tag)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Entries */}
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No journal entries found.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {entries.map(entry => (
              <div 
                key={entry.id} 
                className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow ${
                  viewMode === 'list' ? 'p-6' : 'overflow-hidden'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{entry.title}</h3>
                        <button 
                          onClick={() => toggleFavorite(entry.id)}
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          <Star 
                            size={20} 
                            fill={entry.isFavorite ? "currentColor" : "none"} 
                            className={entry.isFavorite ? "text-yellow-400" : ""} 
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{formatDate(entry.date)}</p>
                      <p className="text-gray-600 line-clamp-3 mb-4">{entry.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{entry.title}</h3>
                        <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
                      </div>
                      <p className="text-gray-600 mt-2 mb-3 line-clamp-2">{entry.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(entry.id)}
                      className="text-gray-400 hover:text-yellow-500 ml-4"
                    >
                      <Star 
                        size={20} 
                        fill={entry.isFavorite ? "currentColor" : "none"} 
                        className={entry.isFavorite ? "text-yellow-400" : ""} 
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JournalHomePage;