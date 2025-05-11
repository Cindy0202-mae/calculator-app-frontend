import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  web: 'http://localhost:3001/api/calculator',
  android: 'http://10.0.2.2:3001/api/calculator',
  ios: 'http://192.168.0.13:3001:3001/api/calculator',
  default: 'http://192.168.0.13:3001/api/calculator'
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

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
    } else {
      // Network error or server unreachable
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Explicitly declare result type for calculation
export const calculate = async (operation: string, operand1: number, operand2: number) => {
  return api.post('/calculate', {
    operation,
    operand1,
    operand2
  });
};

export default api;
