import api from './client';

export const calculate = async (data: {
  operation: string;
  operand1: string;
  operand2?: string;
}) => api.post('/calculate', data);

export const getHistory = () => api.get('/calculator/history');
export const deleteHistory = (id: number) => api.delete(`/calculator/history/${id}`);
