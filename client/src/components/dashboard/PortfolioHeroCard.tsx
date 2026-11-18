'use client';

import React from 'react';
import { useCryptoPrices } from '../../hooks/useCryptoPrices';
import { PortfolioCardView } from './PortfolioCardView';

export const PortfolioHeroCard: React.FC = () => {
  const { data: marketData, isLoading, refetch, isFetching } = useCryptoPrices();

  // Simulated account states that would link to user state management later
  const totalBalance = 6230.00;
  const cashBalance = 4120.50;
  const investedBalance = 2109.50;

  const dailyChange = marketData?.bitcoin?.usd_24h_change || 1.40;
  const btcPrice = marketData?.bitcoin?.usd || 92450;

  return (
    <PortfolioCardView
      totalBalance={totalBalance}
      cashBalance={cashBalance}
      investedBalance={investedBalance}
      dailyChange={dailyChange}
      btcPrice={btcPrice}
      isLoading={isLoading}
      isFetching={isFetching}
      onRefresh={() => refetch()}
    />
  );
};