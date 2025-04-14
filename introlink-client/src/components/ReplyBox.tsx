import React, { useState } from 'react';
import { Send, Paperclip, ImageIcon, Smile } from 'lucide-react';

interface ReplyBoxProps {
  threadId: number;
  onReplySubmit?: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  showAttachments?: boolean;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({
  threadId,
  onReplySubmit,
  placeholder = "Write your reply here...",
  autoFocus = false,
  showAttachments = true
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(autoFocus);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this to your API
      console.log(`Submitting reply to thread ${threadId}:`, content);
      
      // Call the optional callback if provided
      if (onReplySubmit) {
        onReplySubmit(content);
      }
      
      // Clear the input on successful submission
      setContent('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // Automatically adjust height based on content
  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustTextareaHeight(e);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : 'border border-gray-200'}`}>
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          placeholder={placeholder}
          value={content}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          rows={Math.max(2, content.split('\n').length)}
          className="w-full px-3 py-2 border-0 resize-none focus:ring-0 focus:outline-none"
          style={{ minHeight: '80px' }}
        />
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {showAttachments && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                title="Add attachment"
              >
                <Paperclip size={18} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                title="Add image"
              >
                <ImageIcon size={18} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                title="Add emoji"
              >
                <Smile size={18} />
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              Press Ctrl+Enter to send
            </span>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                !content.trim() || isSubmitting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Sending...' : 'Reply'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReplyBox;