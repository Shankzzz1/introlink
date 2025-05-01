import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  Book, 
  Heart, 
  Tag, 
  Settings, 
  Lock, 
  Edit, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';

// Mock user data - replace with actual data fetching in your app
const MOCK_USER = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatarUrl: null, // Will use fallback if null
  joinedDate: '2023-05-15T00:00:00Z',
  stats: {
    totalEntries: 42,
    favorites: 12,
    tags: 18
  },
  preferences: {
    darkMode: false,
    emailNotifications: true,
    defaultPrivacy: 'private'
  }
};

const ProfilePage = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  // Format date to display in a user-friendly way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Function to handle logout (replace with your actual logout logic)
  const handleLogout = () => {
    console.log('User logged out');
    // Implement actual logout logic here
  };

  // Function to handle preference changes (replace with your actual update logic)
  const handlePreferenceChange = (key: string, value: any) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [key]: value
      }
    }));
    
    // In a real app, you would save this to your backend
    console.log(`Updated ${key} to ${value}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 py-6 px-6 sm:px-8">
          <div className="flex items-center">
            {/* Avatar with fallback */}
            <div className="h-20 w-20 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-600 text-xl font-bold overflow-hidden">
              {user.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={`${user.name}'s avatar`} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{user.name.charAt(0)}</span>
              )}
            </div>
            
            <div className="ml-4 flex-1">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <div className="flex items-center text-indigo-100 mt-1">
                <Mail size={16} className="mr-1" />
                <span>{user.email}</span>
              </div>
            </div>
            
            <Link 
              to="/profile/edit" 
              className="bg-white text-indigo-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center"
            >
              <Edit size={16} className="mr-1" />
              Edit Profile
            </Link>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <>
              {/* Profile Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Your personal information and activity stats.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Joined</p>
                      <p className="text-sm text-gray-500">{formatDate(user.joinedDate)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Stats Cards */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-md p-2">
                        <Book size={20} className="text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Journal Entries</p>
                        <p className="text-xl font-bold text-gray-900">{user.stats.totalEntries}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-red-100 rounded-md p-2">
                        <Heart size={20} className="text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Favorites</p>
                        <p className="text-xl font-bold text-gray-900">{user.stats.favorites}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-md p-2">
                        <Tag size={20} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Tags Created</p>
                        <p className="text-xl font-bold text-gray-900">{user.stats.tags}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/journal" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View My Journals
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Settings */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your account preferences and privacy settings.
                  </p>
                </div>
                
                {/* General Settings */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                    <Settings size={18} className="mr-2 text-gray-500" />
                    General Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={user.preferences.darkMode} 
                          onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive email notifications about your journal</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={user.preferences.emailNotifications}
                          onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Privacy Settings */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                    <Lock size={18} className="mr-2 text-gray-500" />
                    Privacy Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Default Journal Privacy</p>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input 
                            type="radio" 
                            name="privacy" 
                            value="public" 
                            checked={user.preferences.defaultPrivacy === 'public'}
                            onChange={() => handlePreferenceChange('defaultPrivacy', 'public')}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" 
                          />
                          <span className="ml-2 text-sm text-gray-700">Public</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input 
                            type="radio" 
                            name="privacy" 
                            value="private" 
                            checked={user.preferences.defaultPrivacy === 'private'}
                            onChange={() => handlePreferenceChange('defaultPrivacy', 'private')}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" 
                          />
                          <span className="ml-2 text-sm text-gray-700">Private</span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Choose the default privacy setting for new journal entries
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Account Actions */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Account Actions</h3>
                  
                  <div className="space-y-3">
                    <Link 
                      to="/account/password" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-indigo-600 py-2"
                    >
                      <span>Change Password</span>
                      <ChevronRight size={16} />
                    </Link>
                    
                    <Link 
                      to="/account/export-data" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-indigo-600 py-2"
                    >
                      <span>Export Your Data</span>
                      <ChevronRight size={16} />
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center text-sm text-red-600 hover:text-red-800 py-2"
                    >
                      <LogOut size={16} className="mr-1" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;