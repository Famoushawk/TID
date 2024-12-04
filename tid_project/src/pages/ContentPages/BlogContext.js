import React, { createContext, useState, useEffect } from "react";
import { BlogPostService } from "../../api/services/BlogPostService";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogPosts = async () => {
    try {
      const results = await BlogPostService.getBlogPosts();
      setBlogPosts(results);
      setError(null);
    } catch (error) {
      console.error('Error fetching blogposts:', error);
      setBlogPosts([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (title, content) => {
    try {
      const blogpost = await BlogPostService.createBlogPost(title, content);
      await fetchBlogPosts();
      return blogpost;
    } catch (error) {
      console.error('Error creating blogpost:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <BlogContext.Provider value={{
      blogPosts,
      loading,
      error,
      selectedBlogPost,
      setSelectedBlogPost,
      createBlogPost,
      refreshBlogPosts: fetchBlogPosts,
    }}>
      {children}
    </BlogContext.Provider>
  );
};