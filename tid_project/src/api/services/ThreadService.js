import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const ThreadService = {
  async getThreads() {
    const threadsResponse = await apiClient.get(ENDPOINTS.THREADS, {
      params: {
        include: 'author',
        order: '-createdAt'
      }
    });

    const threads = threadsResponse.data.results;

    // Get comment counts for each thread individually
    const threadsWithComments = await Promise.all(
      threads.map(async (thread) => {
        const commentsResponse = await apiClient.get(ENDPOINTS.POSTS, {
          params: {
            where: JSON.stringify({
              thread: {
                __type: "Pointer",
                className: "Thread",
                objectId: thread.objectId
              }
            }),
            count: 1,
            limit: 0
          }
        });
        
        return {
          ...thread,
          commentCount: commentsResponse.data.count || 0
        };
      })
    );

    return threadsWithComments;
  },

  async createThread(title, content) {
    // Get current user first
    const userResponse = await apiClient.get('/users/me');
    const username = userResponse.data.username;
    const userId = userResponse.data.objectId;

    const response = await apiClient.post(ENDPOINTS.THREADS, {
      title,
      content,
      author: {
        __type: "Pointer",
        className: "_User",
        objectId: userId
      },
      authorName: username, // Adding as a fallback
      ACL: {
        [userId]: {
          "read": true,
          "write": true
        },
        "*": {
          "read": true
        }
      }
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