import { apiClient } from './apiClient';

export const fetchProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};