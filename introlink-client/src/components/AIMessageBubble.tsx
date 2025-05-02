import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface AIMessageBubbleProps {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIMessageBubble = ({ content, sender, timestamp }: AIMessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // For user messages, just display the plain text
  if (sender === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex flex-col max-w-[75%]">
          <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-md">
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
          <span className="text-xs text-gray-500 self-end mt-1">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // For AI messages, use markdown and show copy button
  return (
    <div className="flex justify-start mb-4">
      <div className="flex flex-col max-w-[75%]">
        <div className="relative bg-white text-gray-800 p-4 rounded-lg rounded-tl-none shadow-md">
          <div className="prose prose-sm max-w-none">
            {/* <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark as { [key: string]: React.CSSProperties }}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown> */}
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {formatTimestamp(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default AIMessageBubble;
