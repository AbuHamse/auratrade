import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example functions to fetch backend data
export const fetchUserPortfolio = async (userId: string) => {
  const response = await apiClient.get(`/user/${userId}`); // adjust based on your route
  return response.data;
};

export const executePaperTrade = async (tradeData: {
  userId: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  margin: number;
  leverage: number;
}) => {
  const response = await apiClient.post('/trade/open', tradeData);
  return response.data;
};