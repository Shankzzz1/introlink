import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, HelpCircle } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
}

const CreateThread: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tags: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    categoryId: ''
  });
  const [showCategoryHelp, setShowCategoryHelp] = useState(false);

  // Sample categories - in a real app, these would come from an API
  const categories: Category[] = [
    { id: 1, name: 'General Discussion', description: 'Talk about anything and everything' },
    { id: 2, name: 'Help & Support', description: 'Get assistance with your questions' },
    { id: 3, name: 'News & Announcements', description: 'Latest updates and information' },
    { id: 4, name: 'Showcase', description: 'Show off your work and projects' },
    { id: 5, name: 'Mental Health', description: 'Discussions about mental health awareness and support' },
    { id: 6, name: 'Feedback', description: 'Share your thoughts and suggestions' },
    { id: 7, name: 'Off-Topic', description: 'Discussions not related to main topics' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
      content: '',
      categoryId: ''
    };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
      isValid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would submit this data to your API
      console.log('Submitting thread:', formData);
      alert('Thread created successfully!');
      
      // Navigate to the thread page or category page
      // In a real app, you would navigate to the newly created thread
      navigate('/category/' + formData.categoryId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Thread</h1>
        <p className="text-gray-600 mt-1">Start a new discussion or ask a question</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          {/* Category Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <button 
                type="button" 
                className="text-gray-500 hover:text-blue-600"
                onClick={() => setShowCategoryHelp(!showCategoryHelp)}
              >
                <HelpCircle size={16} />
              </button>
            </div>
            
            {showCategoryHelp && (
              <div className="mb-3 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
                Select the category that best fits your thread topic. This helps other users find your thread more easily.
              </div>
            )}
            
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className={`w-full rounded-lg border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} - {category.description}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
            )}
          </div>

          {/* Thread Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Give your thread a descriptive title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title ? (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                A good title clearly communicates what your thread is about
              </p>
            )}
          </div>

          {/* Thread Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your thread content here..."
              value={formData.content}
              onChange={handleInputChange}
              rows={12}
              className={`w-full rounded-lg border ${errors.content ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></textarea>
            {errors.content ? (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            ) : (
              <div className="mt-1 text-xs text-gray-500">
                <p>You can use markdown to format your post:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li># Heading 1, ## Heading 2</li>
                  <li>**bold**, *italic*</li>
                  <li>- item 1, - item 2 (for lists)</li>
                </ul>
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags <span className="text-gray-500">(optional)</span>
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                id="tags"
                placeholder="Add tags to help categorize your thread"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Press Enter or click Add after each tag. Separate multiple tags with commas.
            </p>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Create Thread
            </button>
          </div>
        </div>
      </form>

      {/* Guidelines */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium text-yellow-800 mb-2">Community Guidelines</h3>
        <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
          <li>Be respectful and considerate of others</li>
          <li>Stay on topic and keep posts relevant to the category</li>
          <li>Do not share personal information</li>
          <li>No spam, advertisements, or self-promotion</li>
          <li>Check if your question has been asked before posting</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateThread;