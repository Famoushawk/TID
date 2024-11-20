import axios from 'axios';
import { API_CONFIG } from './config';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
});

apiClient.interceptors.request.use(config => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    config.headers['X-Parse-Session-Token'] = sessionToken;
  }
  return config;
});

export default apiClient;