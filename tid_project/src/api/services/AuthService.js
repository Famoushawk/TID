import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const AuthService = {
  async login(username, password) {
    const response = await apiClient.post(ENDPOINTS.LOGIN, { username, password });
    if (response.data.sessionToken) {
      localStorage.setItem('sessionToken', response.data.sessionToken);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem('sessionToken');
    return apiClient.post('/logout');
  },

  async getCurrentUser() {
    return await apiClient.get(ENDPOINTS.SETTINGS);
  },

  async updateProfile(userData) {
    return await apiClient.put(ENDPOINTS.SETTINGS, userData);
  },

  async changePassword(oldPassword, newPassword) {
    return await apiClient.put(ENDPOINTS.SETTINGS, {
      password: newPassword,
      old_password: oldPassword
    });
  }
};