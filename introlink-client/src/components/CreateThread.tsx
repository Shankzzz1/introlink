import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, HelpCircle } from 'lucide-react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  description: string;
}

const CreateThread: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
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

  // Fetch categories from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    const tag = currentTag.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
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
    const newErrors = { title: '', content: '', categoryId: '' };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/threads', {
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        tags: formData.tags
        
      });
      console.log("Test")
      console.log('Category ID being sent:', formData.categoryId);

      if (response.status === 201) {
        alert('Thread created successfully!');
        navigate('/category/' + formData.categoryId);
      }
    } catch (error: any) {
      console.error('Error creating thread:', error);
      alert(error.response?.data?.error || 'An error occurred while creating the thread.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4">
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
              <button type="button" className="text-gray-500 hover:text-blue-600" onClick={() => setShowCategoryHelp(!showCategoryHelp)}>
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
                <option key={category._id} value={category._id}>
                  {category.name} - {category.description}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>}
          </div>

          {/* Title */}
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
              <p className="mt-1 text-xs text-gray-500">A good title clearly communicates what your thread is about</p>
            )}
          </div>

          {/* Content */}
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

          {/* Tags */}
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
            <p className="text-xs text-gray-500 mb-2">Press Enter or click Add to add a tag.</p>
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map(tag => (
                <span key={tag} className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1">
                  {tag}
                  <X size={12} onClick={() => handleRemoveTag(tag)} className="cursor-pointer text-red-500" />
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
