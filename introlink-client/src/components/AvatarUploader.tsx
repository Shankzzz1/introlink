import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Upload, X, Camera, Check } from 'lucide-react';

interface AvatarUploaderProps {
  initialImage?: string;
  onImageUpload?: (file: File) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  initialImage,
  onImageUpload,
  maxSizeInMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}) => {
  // State for drag and drop
  const [isDragging, setIsDragging] = useState(false);
  
  // State for the selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);
  
  // State for upload success
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset success message after 3 seconds
  useEffect(() => {
    let timer: number;
    if (uploadSuccess) {
      timer = window.setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [uploadSuccess]);

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `File type not supported. Please upload: ${allowedTypes.map(type => type.replace('image/', '')).join(', ')}`;
    }
    
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      return `File size exceeds ${maxSizeInMB}MB limit`;
    }
    
    return null;
  };

  const processFile = (file: File) => {
    // Reset states
    setError(null);
    setUploadSuccess(false);
    
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
    
    // Store the file for upload
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (selectedFile && onImageUpload) {
      onImageUpload(selectedFile);
      setUploadSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Profile Picture</h2>
        <p className="text-sm text-gray-500">
          Upload a new profile picture or avatar
        </p>
      </div>
      
      <div 
        className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-blue-400 bg-white'
        } transition-colors duration-200`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Preview or Placeholder */}
        {selectedImage ? (
          <div className="relative inline-block">
            <img 
              src={selectedImage} 
              alt="Profile preview" 
              className="w-32 h-32 mx-auto rounded-full object-cover border border-gray-200"
            />
            <button 
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <Camera size={40} className="text-gray-400" />
          </div>
        )}
        
        {/* Upload Instructions */}
        <div className="mt-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={allowedTypes.join(',')}
            className="hidden"
            aria-label="Upload profile picture"
          />
          
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload size={16} className="mr-2" />
              Select Image
            </button>
            
            <p className="text-xs text-gray-500">
              or drag and drop your image here
            </p>
            
            <p className="text-xs text-gray-500">
              {`Supported formats: ${allowedTypes.map(type => type.replace('image/', '')).join(', ')}`}
              <br />
              Max size: {maxSizeInMB}MB
            </p>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
      
      {/* Upload Button */}
      {selectedFile && !error && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploadSuccess}
            className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
              uploadSuccess 
                ? 'bg-green-500' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            } transition-colors`}
          >
            {uploadSuccess ? (
              <>
                <Check size={16} className="mr-2" />
                Uploaded!
              </>
            ) : (
              'Upload Avatar'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;