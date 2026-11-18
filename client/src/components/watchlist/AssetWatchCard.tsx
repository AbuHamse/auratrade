'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AssetHeader } from './AssetHeader';
import { AssetMetricsFooter } from './AssetMetricsFooter';

interface AssetWatchCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  imageUrl: string;
  actionType: 'Buy' | 'Sell' | 'Hold';
}

export const AssetWatchCard: React.FC<AssetWatchCardProps> = ({
  id,
  name,
  symbol,
  price,
  changePercent,
  high24h,
  low24h,
  marketCap,
  imageUrl,
  actionType,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/watchlist/${id}`)}
      className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 flex flex-col justify-between hover:border-auratrade-purple transition-all duration-300 group shadow-xl cursor-pointer"
    >
      <AssetHeader name={name} symbol={symbol} imageUrl={imageUrl} actionType={actionType} />
      <AssetMetricsFooter
        price={price}
        changePercent={changePercent}
        high24h={high24h}
        low24h={low24h}
        marketCap={marketCap}
      />
    </div>
  );
};