import { useState } from 'react';
import { EyeOff, Lock, Bot, Shield } from 'lucide-react';

const PrivacyPreferences = () => {
  // Privacy settings state
  const [privateByDefault, setPrivateByDefault] = useState(true);
  const [hideJournal, setHideJournal] = useState(false);
  const [disableAITracking, setDisableAITracking] = useState(false);
  
  // Function to save privacy settings
  const savePrivacySettings = () => {
    // Here you would typically send these settings to your API
    console.log('Saving privacy settings:', {
      privateByDefault,
      hideJournal,
      disableAITracking
    });
    
    // Display success message
    alert('Privacy settings saved successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <div className="flex items-center mb-2">
          <Shield className="text-blue-600 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">Privacy Preferences</h1>
        </div>
        <p className="text-gray-600">
          Control how your information is used and who can see your journal entries
        </p>
      </header>

      <div className="space-y-6">
        {/* Privacy settings section */}
        <section className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Settings</h2>
          
          <div className="space-y-4">
            {/* Private by default toggle */}
            <div className="flex items-center justify-between py-3 border-b border-blue-100">
              <div className="flex items-center max-w-md">
                <Lock className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Make journal entries private by default</h3>
                  <p className="text-sm text-gray-600">New entries will only be visible to you unless you choose to share them</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privateByDefault}
                  onChange={() => setPrivateByDefault(!privateByDefault)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Hide journal toggle */}
            <div className="flex items-center justify-between py-3 border-b border-blue-100">
              <div className="flex items-center max-w-md">
                <EyeOff className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Hide journal from public view</h3>
                  <p className="text-sm text-gray-600">Your journal will not appear in public feeds or search results</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideJournal}
                  onChange={() => setHideJournal(!hideJournal)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Disable AI tracking toggle */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center max-w-md">
                <Bot className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Disable AI usage tracking</h3>
                  <p className="text-sm text-gray-600">Your journal entries won't be used to improve our AI models</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={disableAITracking}
                  onChange={() => setDisableAITracking(!disableAITracking)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Data management section */}
        <section className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Management</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              You can request a copy of your data or delete all your information from our servers at any time.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Request Data Export
              </button>
              
              <button
                className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Delete All My Data
              </button>
            </div>
          </div>
        </section>

        {/* Save button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={savePrivacySettings}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Privacy information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">About Your Privacy</h3>
        <p className="text-sm text-gray-500">
          We take your privacy seriously. Your data is encrypted and stored securely. 
          You can change these settings at any time or contact our support team if you have any questions.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Read our full <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> for more information.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPreferences;