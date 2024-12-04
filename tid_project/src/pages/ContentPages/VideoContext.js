import React, { createContext, useState, useEffect } from "react";
import { VideoService } from "../../api/services/VideoService";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoes, setVideoes] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideoes = async () => {
    try {
      const results = await VideoService.getVideoes();
      setVideoes(results);
      setError(null);
    } catch (error) {
      console.error('Error fetching videoes:', error);
      setVideoes([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createVideo = async (title, content) => {
    try {
      const video = await VideoService.createVideo(title, content);
      await fetchVideoes();
      return video;
    } catch (error) {
      console.error('Error creating blogpost:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchVideoes();
  }, []);

  return (
    <VideoContext.Provider value={{
      videoes,
      loading,
      error,
      selectedVideo,
      setSelectedVideo,
      createVideo,
      refreshVideoes: fetchVideoes,
    }}>
      {children}
    </VideoContext.Provider>
  );
};