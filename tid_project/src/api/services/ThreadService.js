import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const ThreadService = {
  async getThreads() {
    const response = await apiClient.get(ENDPOINTS.THREADS, {
      params: {
        include: 'author',
        order: '-createdAt'
      }
    });
    return response.data.results;
  },

  async createThread(title, content) {
    const response = await apiClient.post(ENDPOINTS.THREADS, {
      title,
      content
    });
    return response.data;
  },

  async getThread(threadId) {
    const response = await apiClient.get(`${ENDPOINTS.THREADS}/${threadId}`, {
      params: {
        include: 'author'
      }
    });
    return response.data;
  }
};