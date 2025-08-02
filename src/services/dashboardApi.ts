import { apiClient } from './apiClient';

export const fetchPartnerships = async () => {
  const response = await apiClient.get('/partnerships');
  return response.data;
};

export const fetchMarketplaceMetrics = async (startDate?: string, endDate?: string) => {
  let url = '/marketplaceMetrics';
  if (startDate && endDate) {
    url += `?date_gte=${startDate}&date_lte=${endDate}`;
  }
  const response = await apiClient.get(url);
  return response.data;
};

export const fetchClicksData = async () => {
  const response = await apiClient.get('/clicksData');
  return response.data;
};