import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThreadService } from '../../api/services/ThreadService';
import { CommentService } from '../../api/services/CommentService';

export const ThreadContext = createContext();

export const ThreadProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsUpdated, setCommentsUpdated] = useState(0);

  const fetchThreads = async () => {
    try {
      const results = await ThreadService.getThreads();
      setThreads(results);
      setError(null);
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
      const thread = await ThreadService.createThread(title, content);
      await fetchThreads();
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  };

  const createComment = async (threadId, content) => {
    if (!threadId || !content) {
      throw new Error('Thread ID and content are required');
    }
    
    try {
      const savedPost = await CommentService.createComment(threadId, content);
      setCommentsUpdated(prev => prev + 1);
      return savedPost;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <ThreadContext.Provider value={{
      threads,
      loading,
      error,
      selectedThread,
      setSelectedThread,
      createThread,
      createComment,
      refreshThreads: fetchThreads,
      commentsUpdated
    }}>
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