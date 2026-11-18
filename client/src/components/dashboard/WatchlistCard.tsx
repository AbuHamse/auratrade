'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistCardProps {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  type?: 'LONG' | 'SHORT' | string;
}

export const WatchlistCard: React.FC<WatchlistCardProps> = ({
  symbol,
  name,
  price,
  change24h,
}) => {
  const isPositive = change24h >= 0;

  return (
    <div className="bg-auratrade-card border border-auratrade-border rounded-2xl p-5 hover:border-auratrade-purple/50 transition-all duration-300 flex flex-col justify-between group shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">{symbol}</span>
          <h4 className="text-sm font-semibold text-gray-200">{name}</h4>
        </div>
        <div className="w-8 h-8 rounded-xl bg-auratrade-indigo/60 border border-auratrade-border flex items-center justify-center text-xs font-bold text-auratrade-lavender group-hover:scale-105 transition-transform">
          {symbol.slice(0, 3)}
        </div>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <span className="text-xs text-gray-500 block">Live Price</span>
          <span className="text-lg font-bold text-white">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositive ? '+' : ''}
          {change24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};