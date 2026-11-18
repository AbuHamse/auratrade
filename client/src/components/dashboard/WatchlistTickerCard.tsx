'use client';

import React from 'react';
import { useCryptoPrices } from '../../hooks/useCryptoPrices';
import { WatchlistCardView } from './WatchlistCardView';

interface WatchlistTickerCardProps {
  coinId: 'bitcoin' | 'ethereum' | 'solana' | string;
  symbol: string;
  name: string;
}

export const WatchlistTickerCard: React.FC<WatchlistTickerCardProps> = ({ coinId, symbol, name }) => {
  const { data: marketData, isLoading } = useCryptoPrices();

  const coinInfo = marketData?.[coinId];
  const price = coinInfo?.usd || 0;
  const change24h = coinInfo?.usd_24h_change || 0;

  return (
    <WatchlistCardView
      symbol={symbol}
      name={name}
      price={price}
      change24h={change24h}
      isLoading={isLoading}
    />
  );
};