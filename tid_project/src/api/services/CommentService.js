import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const CommentService = {
  async getComments(threadId) {
    const response = await apiClient.get(ENDPOINTS.POSTS, {
      params: {
        where: JSON.stringify({
          thread: { __type: "Pointer", className: "Thread", objectId: threadId }
        }),
        order: 'createdAt'
      }
    });
    return response.data.results;
  },

  async createComment(threadId, content) {
    try {
      // Get current user info first
      const userResponse = await apiClient.get('/users/me');
      const userId = userResponse.data.objectId;
      const username = userResponse.data.username;
      const userAvatar = userResponse.data.avatar;
 
      const data = {
        content,
        author: username,
        authorAvatar: userAvatar, // Include the user's chosen avatar
        userId: userId,
        thread: {
          __type: "Pointer", 
          className: "Thread",
          objectId: threadId
        },
        ACL: {
          [userId]: {
            "read": true,
            "write": true
          },
          "*": {
            "read": true
          }
        }
      };
 
      const response = await apiClient.post(ENDPOINTS.POSTS, data);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error.response?.data || error);
      throw error;
    }
  }
};