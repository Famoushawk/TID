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
    const data = {
      content: content,
      thread: {
        __type: "Pointer",
        className: "Thread",
        objectId: threadId
      },
      ACL: {
        "*": {
          "read": true
        }
      }
    };

    console.log('Request data:', data);
    const response = await apiClient.post(ENDPOINTS.POSTS, data);
    return response.data;
  }
};