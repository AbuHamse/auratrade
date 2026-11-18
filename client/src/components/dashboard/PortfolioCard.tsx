'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface PortfolioCardProps {
  totalBalance: number;
  dailyChangePercentage: number;
  cashBalance: number;
  investedBalance: number;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  totalBalance,
  dailyChangePercentage,
  cashBalance,
  investedBalance,
}) => {
  const isPositive = dailyChangePercentage >= 0;

  return (
    <div className="bg-auratrade-card border border-auratrade-border rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-auratrade-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Portfolio Balance
          </span>
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isPositive ? '+' : ''}
            {dailyChangePercentage.toFixed(2)}%
          </div>
        </div>

        <div className="text-3xl font-extrabold text-white tracking-tight mb-6">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {/* Breakdown sub-grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-auratrade-border/60">
        <div>
          <span className="text-xs text-gray-400 block mb-1">Cash Reserves</span>
          <span className="text-sm font-bold text-gray-200">
            ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block mb-1">Active Investments</span>
          <span className="text-sm font-bold text-gray-200">
            ${investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};