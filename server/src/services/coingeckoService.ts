import axios from 'axios';
import { APIError } from '../middleware/errorHandler';

// Use the standard demo API URL
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const getSimplePrice = async (ids: string[] = ['bitcoin', 'ethereum', 'solana']) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: ids.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
      headers: {
        // Automatically picks up your free demo key if provided in .env
        ...(process.env.COINGECKO_API_KEY && { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }),
      },
      timeout: 5000,
    });
    return response.data;
  } catch (error: any) {
    throw new APIError(`Failed to fetch market data from CoinGecko: ${error.message}`, 502);
  }
};