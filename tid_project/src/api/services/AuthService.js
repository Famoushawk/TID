import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const AuthService = {
  async login(username, password) {
    try {
      const response = await apiClient.post(ENDPOINTS.LOGIN, { username, password });
      if (response.data.sessionToken) {
        localStorage.setItem('sessionToken', response.data.sessionToken);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Invalid username or password');
      }
      throw new Error('Login failed - please try again');
    }
  },

  async logout() {
    localStorage.removeItem('sessionToken');
    return apiClient.post('/logout');
  },

  async getCurrentUser() {
    return await apiClient.get(ENDPOINTS.SETTINGS);
  },

  async updateProfile(userData) {
    const { email, avatar } = userData;
    const updateData = {
      email,
      avatar: avatar  // Just send the URL as a string
    };
    
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.data.objectId;
      return await apiClient.put(`/users/${userId}`, updateData);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error);
      throw error;
    }
  },

  async changePassword(oldPassword, newPassword) {
    try {
      const currentUser = await this.getCurrentUser();
      const userId = currentUser.data.objectId;
      return await apiClient.put(`/users/${userId}`, {
        password: newPassword
      });
    } catch (error) {
      console.error('Error changing password:', error.response?.data || error);
      throw error;
    }
  },

  async signup(username, email, password) {
    try {
      const response = await apiClient.post(ENDPOINTS.SIGNUP, {
        username,
        email,
        password
      });
      
      // After successful signup, log the user in automatically
      if (response.data) {
        await this.login(username, password);
      }
      
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Signup failed');
      }
      throw new Error('Signup failed - please try again');
    }
  },
};