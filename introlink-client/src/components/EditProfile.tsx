import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, X, User } from 'lucide-react';

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

// Mock user data - replace with actual data fetching
const MOCK_USER: UserProfile = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  bio: 'Writer, thinker, and avid journaler. I love documenting my thoughts and experiences.',
  avatarUrl: null
};

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State to track form data
  const [formData, setFormData] = useState<UserProfile>(MOCK_USER);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(MOCK_USER.avatarUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Trigger file input click when avatar area is clicked
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  
  // Handle avatar file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file is too large. Please select an image under 5MB.');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarPreview(reader.result);
        // In a real app, you'd likely prepare this file for upload to your server
        // rather than storing the data URL directly in state
      }
    };
    reader.readAsDataURL(file);
    
    setError(null);
  };
  
  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // In a real app, you'd send formData and the avatar file to your API
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile updated:', { ...formData, avatarUrl: avatarPreview });
      
      setSuccessMessage('Profile updated successfully!');
      
      // Navigate back to profile after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
      
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-indigo-600 py-6 px-6">
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Avatar Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center">
              <div
                onClick={handleAvatarClick}
                className="relative h-24 w-24 rounded-full overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors"
              >
                {avatarPreview ? (
                  <>
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <User className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-1 block text-xs text-gray-500">Upload</span>
                  </div>
                )}
              </div>
              
              <div className="ml-5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile picture"
                />
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </button>
                  
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </button>
                  )}
                </div>
                
                <p className="mt-1 text-xs text-gray-500">
                  Recommended: Square JPG or PNG, max 5MB
                </p>
              </div>
            </div>
          </div>
          
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your name"
            />
          </div>
          
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your email address"
            />
            <p className="mt-1 text-xs text-gray-500">
              Changing your email may require verification
            </p>
          </div>
          
          {/* Bio Field */}
          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write a short bio about yourself"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;