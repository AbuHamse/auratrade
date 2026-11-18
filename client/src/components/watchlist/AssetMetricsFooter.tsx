'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetMetricsFooterProps {
  price: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  marketCap: number;
}

export const AssetMetricsFooter: React.FC<AssetMetricsFooterProps> = ({
  price,
  changePercent,
  high24h,
  low24h,
  marketCap,
}) => {
  const isPositive = changePercent >= 0;

  return (
    <div className="mt-4 pt-4 border-t border-[#131929] font-mono space-y-3">
      {/* Current Price & 24h Change */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] text-gray-500 block mb-0.5">CURRENT PRICE</span>
          <span className="text-base font-bold text-white">
            ${price?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
          </span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {isPositive ? '+' : ''}
          {changePercent?.toFixed(2)}%
        </div>
      </div>

      {/* 24h High / Low & Market Cap metadata */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#131929]/50 text-[10px] text-gray-400">
        <div>
          <span className="text-gray-500 block">24H HIGH / LOW</span>
          <span className="text-gray-300 font-semibold">
            ${high24h?.toLocaleString()} /${low24h?.toLocaleString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-gray-500 block">MARKET CAP</span>
          <span className="text-gray-300 font-semibold">
            ${(marketCap / 1e9).toFixed(2)}B
          </span>
        </div>
      </div>
    </div>
  );
};