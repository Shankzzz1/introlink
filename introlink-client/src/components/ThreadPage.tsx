import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, MessageSquare, Flag, Share2, Clock, Send, MoreHorizontal } from 'lucide-react';

interface Thread {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
    avatar: string;
    joinDate: string;
    postCount: number;
  };
  createdAt: string;
  likes: number;
  views: number;
}

interface Reply {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    joinDate: string;
    postCount: number;
  };
  createdAt: string;
  likes: number;
  isLikedByUser: boolean;
}

const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [newReply, setNewReply] = useState('');
  const [likedReplies, setLikedReplies] = useState<Set<number>>(new Set());
  const [isThreadLiked, setIsThreadLiked] = useState(false);
  
  // Mock data - in a real app, this would be fetched based on threadId
  const thread: Thread = {
    id: parseInt(threadId || '1'),
    title: "Tips for managing anxiety during stressful periods",
    content: `
I've been developing some techniques that have really helped me manage anxiety during particularly stressful times like exams, job interviews, or important presentations. I wanted to share these with the community in hopes they might help others too.

## Deep Breathing Exercises
One of the simplest yet most effective techniques I've found is the 4-7-8 breathing method:
- Inhale quietly through your nose for 4 seconds
- Hold your breath for 7 seconds
- Exhale completely through your mouth for 8 seconds
- Repeat 3-4 times

This helps activate your parasympathetic nervous system, which controls relaxation.

## Grounding Techniques
When anxiety makes you feel disconnected from reality, try the 5-4-3-2-1 method:
- Acknowledge 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

This brings you back to the present moment and away from anxious thoughts.

## Regular Physical Activity
I've found that even 20 minutes of moderate exercise can significantly reduce anxiety levels for hours afterward. Walking, yoga, or dancing work especially well for me.

What techniques have worked for you? I'd love to hear your experiences and additional tips!
    `,
    category: {
      id: 5,
      name: "Mental Health"
    },
    author: {
      id: 42,
      name: "AnxietyAwareness",
      avatar: "AA",
      joinDate: "2024-01-15",
      postCount: 67
    },
    createdAt: "2025-04-10T14:30:00",
    likes: 47,
    views: 342
  };

  const replies: Reply[] = [
    {
      id: 101,
      content: "Thank you so much for sharing these techniques! The 4-7-8 breathing method has been a game-changer for me as well. Another technique I find helpful is progressive muscle relaxation, where you tense and then release each muscle group in your body. It helps identify where you're holding tension and consciously release it.",
      author: {
        id: 28,
        name: "MindfulJourney",
        avatar: "MJ",
        joinDate: "2023-09-22",
        postCount: 132
      },
      createdAt: "2025-04-10T15:45:00",
      likes: 18,
      isLikedByUser: false
    },
    {
      id: 102,
      content: "I've tried breathing exercises before but struggled to make them work for me. However, I found that going for a quick 10-minute walk outside when anxiety starts to build makes a huge difference. Something about changing my environment and getting fresh air seems to reset my nervous system.",
      author: {
        id: 15,
        name: "WellnessWalker",
        avatar: "WW",
        joinDate: "2024-03-05",
        postCount: 43
      },
      createdAt: "2025-04-10T17:20:00",
      likes: 12,
      isLikedByUser: false
    },
    {
      id: 103,
      content: "For those who struggle with meditation or breathing exercises, I highly recommend trying 'box breathing' - it's a bit simpler than 4-7-8 and works well for beginners. Just breathe in for 4 counts, hold for 4, exhale for 4, and hold for 4 again. Repeat as needed. \n\nAlso, limiting caffeine intake has helped me tremendously with managing baseline anxiety levels.",
      author: {
        id: 76,
        name: "CalmCollective",
        avatar: "CC",
        joinDate: "2023-11-18",
        postCount: 205
      },
      createdAt: "2025-04-11T09:05:00",
      likes: 27,
      isLikedByUser: true
    },
    {
      id: 104,
      content: "Something that's been really effective for me is keeping a worry journal. Whenever anxious thoughts start to overwhelm me, I write them down along with potential solutions or outcomes. The act of externalizing those thoughts helps me gain perspective and reduces their power over me. Has anyone else tried this?",
      author: {
        id: 31,
        name: "ThoughtWriter",
        avatar: "TW",
        joinDate: "2024-02-10",
        postCount: 89
      },
      createdAt: "2025-04-11T14:30:00",
      likes: 15,
      isLikedByUser: false
    }
  ];

  useEffect(() => {
    // Initialize liked replies from the mock data
    const initialLikedReplies = new Set<number>();
    replies.forEach(reply => {
      if (reply.isLikedByUser) {
        initialLikedReplies.add(reply.id);
      }
    });
    setLikedReplies(initialLikedReplies);
    
    // Scroll to top when thread changes
    window.scrollTo(0, 0);
  }, [threadId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    alert(`Reply submitted: ${newReply}`);
    setNewReply('');
  };

  const toggleLikeReply = (replyId: number) => {
    setLikedReplies(prev => {
      const newLikedReplies = new Set(prev);
      if (newLikedReplies.has(replyId)) {
        newLikedReplies.delete(replyId);
      } else {
        newLikedReplies.add(replyId);
      }
      return newLikedReplies;
    });
  };

  const toggleLikeThread = () => {
    setIsThreadLiked(!isThreadLiked);
  };

  // Calculate days since a user joined
  const calculateMemberDuration = (joinDate: string): string => {
    const join = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - join.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Forums</Link>
        <span>/</span>
        <Link to={`/category/${thread.category.id}`} className="hover:text-blue-600">{thread.category.name}</Link>
        <span>/</span>
        <span className="font-medium text-gray-700">{thread.title}</span>
      </div>

      {/* Thread Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{thread.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{formatDate(thread.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>{replies.length} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} />
            <span>{thread.likes + (isThreadLiked ? 1 : 0)} likes</span>
          </div>
        </div>
      </div>

      {/* Original Post */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="flex">
          {/* Author Sidebar */}
          <div className="w-48 p-6 bg-gray-50 border-r border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-xl">
                {thread.author.avatar}
              </div>
              <div className="mt-3 font-medium text-gray-800">{thread.author.name}</div>
              <div className="text-sm text-gray-500 mt-1">Member for {calculateMemberDuration(thread.author.joinDate)}</div>
              <div className="text-sm text-gray-500 mt-1">{thread.author.postCount} posts</div>
            </div>
          </div>
          
          {/* Post Content */}
          <div className="flex-1 p-6">
            <div className="prose max-w-none">
              {thread.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  // Handle headings
                  return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(3)}</h2>;
                } else if (paragraph.includes('- ')) {
                  // Handle lists
                  const items = paragraph.split('\n- ');
                  return (
                    <ul key={index} className="list-disc pl-5 my-3">
                      {items.map((item, i) => {
                        if (i === 0 && !item.startsWith('- ')) return null;
                        return <li key={i}>{item.replace('- ', '')}</li>;
                      })}
                    </ul>
                  );
                } else {
                  // Regular paragraphs
                  return <p key={index} className="mb-4">{paragraph}</p>;
                }
              })}
            </div>
            
            {/* Post Actions */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <button 
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                  isThreadLiked ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                }`}
                onClick={toggleLikeThread}
              >
                <ThumbsUp size={18} />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">
                <Flag size={18} />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Replies Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{replies.length} Replies</h2>
        
        {replies.map((reply) => (
          <div 
            key={reply.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
            id={`reply-${reply.id}`}
          >
            <div className="flex">
              {/* Author Sidebar */}
              <div className="w-48 p-6 bg-gray-50 border-r border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                    {reply.author.avatar}
                  </div>
                  <div className="mt-2 font-medium text-gray-800">{reply.author.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Member for {calculateMemberDuration(reply.author.joinDate)}</div>
                  <div className="text-xs text-gray-500 mt-1">{reply.author.postCount} posts</div>
                </div>
              </div>
              
              {/* Reply Content */}
              <div className="flex-1 p-6">
                <div className="text-xs text-gray-500 mb-2">
                  {formatDate(reply.createdAt)}
                </div>
                <div className="prose max-w-none">
                  {reply.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>
                
                {/* Reply Actions */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                  <button 
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                      likedReplies.has(reply.id) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => toggleLikeReply(reply.id)}
                  >
                    <ThumbsUp size={16} />
                    <span>{reply.likes + (likedReplies.has(reply.id) ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">
                    <MessageSquare size={16} />
                    <span>Quote</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">
                    <Flag size={16} />
                    <span>Report</span>
                  </button>
                  <div className="flex-1 flex justify-end">
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Reply Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Post a Reply</h3>
          <form onSubmit={handleReplySubmit}>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your reply here..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newReply.trim()}
              >
                <Send size={18} />
                <span>Post Reply</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;