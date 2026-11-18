'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  image: string;
}

const fetchCryptoPrices = async (): Promise<Record<string, CoinMarketData>> => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: 'bitcoin,ethereum,solana,shiba-inu,pepe,sui,polkadot,dogecoin,floki,cardano,ripple,avalanche-2',
      order: 'market_cap_desc',
      sparkline: false,
    },
  });

  // Map array to object keyed by coin id to maintain compatibility if other components expect key-value mapping
  const mappedData: Record<string, CoinMarketData> = {};
  response.data.forEach((coin: CoinMarketData) => {
    mappedData[coin.id] = coin;
  });

  return mappedData;
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000, // Automatically polls every 30 seconds for live freshness
  });
};