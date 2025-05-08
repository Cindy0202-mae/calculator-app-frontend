import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3001/api',
  ios: 'http://localhost:3001/api',
  default: 'http://192.168.28.199:3001/api', // Fallback for other platforms
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use(config => {
  console.log('Request URL:', config.url); // Debugging
  return config;
});


export default api;
