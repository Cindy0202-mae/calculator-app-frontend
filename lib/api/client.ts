import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3001/api/calculator',
  ios: 'http://localhost:3001/api/calculator',
  default: 'http://192.168.0.13:3001/api/calculator' // Fallback for other platforms
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
  response => {
    console.log('Response:', response.data); // Debugging
    return response;
  },
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message); // Debugging
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
