import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const VideoService = {
  async getVideoes() {
    const response = await apiClient.get(ENDPOINTS.VIDEOES, {
      params: {
        order: '-createdAt'
      }
    });
    return response.data.results;
  },

  async createVideo(title, url) {
    const response = await apiClient.post(ENDPOINTS.VIDEOES, {
      title,
      url
    });
    return response.data;
  },

  async getVideo(videoId) {
    const response = await apiClient.get(`${ENDPOINTS.VIDEOES}/${videoId}`);
    return response.data;
  }
};