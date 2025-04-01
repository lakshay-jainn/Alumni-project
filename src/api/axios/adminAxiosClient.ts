import axios from 'axios';
import { logout } from './AuthBridge';

const adminAxiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

adminAxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminAxiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.token === false) {
      logout(); // Trigger logout on unauthorized access
    }
    return Promise.reject(error);
}
);

export default adminAxiosClient;