'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistCardViewProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  isLoading: boolean;
}

export const WatchlistCardView: React.FC<WatchlistCardViewProps> = ({
  symbol,
  name,
  price,
  change24h,
  isLoading,
}) => {
  const isPositive = change24h >= 0;

  return (
    <div className="bg-[#0D111A] border border-[#1E2538] rounded-2xl p-5 hover:border-auratrade-purple/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-gray-500 font-mono tracking-wider uppercase">{symbol}</span>
          <h4 className="text-sm font-semibold text-gray-200">{name}</h4>
        </div>
        <div className="w-8 h-8 rounded-xl bg-[#131929] border border-[#1E2538] flex items-center justify-center text-xs font-mono font-bold text-auratrade-lavender group-hover:scale-105 transition-transform">
          {symbol.slice(0, 3)}
        </div>
      </div>

      <div className="flex items-end justify-between mt-2 font-mono">
        <div>
          <span className="text-[10px] text-gray-500 block mb-0.5">LIVE PRICE</span>
          <span className="text-base font-bold text-white">
            {isLoading && !price ? 'Syncing...' : `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {isPositive ? '+' : ''}
          {change24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};