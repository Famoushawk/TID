import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const CommentService = {
  async getComments(threadId) {
    const response = await apiClient.get(ENDPOINTS.POSTS, {
      params: {
        include: 'author',  // Include author to get profile picture
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
      const userResponse = await apiClient.get('/users/me');
      const username = userResponse.data.username;
      const userId = userResponse.data.objectId;
      const avatar = userResponse.data.avatar?.url || null; // Get user's avatar if it exists
 
      const data = {
        content,
        author: {
          __type: "Pointer",
          className: "_User",
          objectId: userId
        },
        authorName: username,
        authorAvatar: avatar,
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