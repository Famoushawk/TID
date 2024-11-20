import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const ProfileService = {
  async setGoal(goalText) {
    try {
      const currentUser = await this.getCurrentUser();
      
      const response = await apiClient.post(ENDPOINTS.GOALS, {
        Goal: goalText,
        Author: {
          __type: "Pointer",
          className: "_User",
          objectId: currentUser.objectId
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error setting goal:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    const response = await apiClient.get(ENDPOINTS.SETTINGS);
    return response.data;
  },

  async getCurrentUserGoals() {
    try {
      const currentUser = await this.getCurrentUser();
      
      const response = await apiClient.get(ENDPOINTS.GOALS, {
        params: {
          where: JSON.stringify({
            Author: {
              __type: "Pointer",
              className: "_User",
              objectId: currentUser.objectId
            }
          }),
          order: '-createdAt'
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  }
};