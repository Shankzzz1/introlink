import { useState } from 'react';
import { Bell, Moon, Sun, Globe, Lock, AlertTriangle } from 'lucide-react';

interface LanguageOption {
  value: string;
  label: string;
}

const AccountSettings = () => {
  // User state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Preferences state
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  // Delete account state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Password error state
  const [passwordError, setPasswordError] = useState('');

  // Available languages
  const languages: LanguageOption[] = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'ja', label: '日本語' },
  ];

  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Here you would call your API to change the password
    alert('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    // Here you would call your API to delete the account
    alert('Account scheduled for deletion');
    setShowDeleteConfirmation(false);
    setDeleteConfirmText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Account Settings</h1>
      
      {/* Password Section */}
      <section className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center mb-4">
          <Lock className="mr-2 text-gray-500" size={20} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Change Password</h2>
        </div>
        
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Password
            </button>
          </div>
        </form>
      </section>
      
      {/* Preferences Section */}
      <section className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Preferences</h2>
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {darkMode ? <Moon className="mr-2 text-blue-500" size={20} /> : <Sun className="mr-2 text-yellow-500" size={20} />}
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Notifications Toggle */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Bell className="mr-2 text-gray-500" size={20} />
            <span className="text-gray-700 dark:text-gray-300">Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {/* Language Selection */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Globe className="mr-2 text-gray-500" size={20} />
            <span className="text-gray-700 dark:text-gray-300">Language</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      
      {/* Delete Account Section */}
      <section className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start mb-4">
          <AlertTriangle className="mr-2 text-red-500 flex-shrink-0 mt-1" size={20} />
          <div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Delete Account</h2>
            <p className="text-sm text-red-500 dark:text-red-400 mt-1">
              This action cannot be undone. All your data will be permanently removed.
            </p>
          </div>
        </div>
        
        {!showDeleteConfirmation ? (
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To confirm, type <strong>DELETE</strong> in the field below:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                disabled={deleteConfirmText !== 'DELETE'}
              >
                Confirm Deletion
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AccountSettings;