import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  ios: 'http://localhost:3001',
  default: 'http://localhost:3001'
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.message);
    return Promise.reject(error);
  }
);

export default api;
