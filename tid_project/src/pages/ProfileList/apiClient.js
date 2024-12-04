import axios from 'axios';


const BASE_URL = 'https://parseapi.back4app.com/'; 

const API_CONFIG = {
  headers: {
    'X-Parse-Application-Id': 'BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P',  
    'X-Parse-REST-API-Key': 'OJ2uQ7qSFn4eMg3y23jPPOq0wBnD49DEiITknteS',
    'Content-Type': 'application/json',
  },
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: API_CONFIG.headers,
});

export const fetchUser = async () => {
  try {
    const response = await apiClient.get('/users/me');  
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData); 
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default apiClient;
