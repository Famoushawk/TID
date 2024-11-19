import React, { createContext, useContext, useState, useEffect } from 'react';
import Parse from 'parse';

const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsUpdated, setCommentsUpdated] = useState(0);

  const fetchThreads = async () => {
    try {
      const Thread = Parse.Object.extend('Thread');
      const query = new Parse.Query(Thread);
      query.include('author');
      query.descending('createdAt');
      
      const results = await query.find();
      
      if (Array.isArray(results)) {
        setThreads(results);
        setError(null);
      } else {
        setThreads([]);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
      setThreads([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createThread = async (title, content) => {
    try {
      const Thread = Parse.Object.extend('Thread');
      const thread = new Thread();
      const currentUser = Parse.User.current();
      
      if (!currentUser) {
        throw new Error('User must be logged in to create a thread');
      }
      
      thread.set({
        title,
        content,
        author: currentUser
      });
      
      await thread.save();
      await fetchThreads(); // Refresh the threads list after creating a new one
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  };

  const createComment = async (threadId, content) => {
    try {
      const Post = Parse.Object.extend('Post');
      const post = new Post();
      const currentUser = Parse.User.current();
      
      if (!currentUser) {
        throw new Error('User must be logged in to comment');
      }
      
      const Thread = Parse.Object.extend('Thread');
      const threadPointer = new Thread();
      threadPointer.id = threadId;
      
      post.set({
        content: content,
        thread: threadPointer,
        author: currentUser.get('username')
      });
      
      const savedPost = await post.save();
      setCommentsUpdated(prev => prev + 1); // Trigger comments refresh
      return savedPost;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  };

  // Initialize by fetching threads
  useEffect(() => {
    fetchThreads();
  }, []);

  const value = {
    threads,
    loading,
    error,
    selectedThread,
    setSelectedThread,
    createThread,
    createComment,
    refreshThreads: fetchThreads,
    commentsUpdated
  };

  return (
    <ThreadContext.Provider value={value}>
      {children}
    </ThreadContext.Provider>
  );
};

export const useThread = () => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error('useThread must be used within a ThreadProvider');
  }
  return context;
};