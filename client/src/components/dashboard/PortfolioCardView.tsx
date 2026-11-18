'use client';

import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface PortfolioCardViewProps {
  totalBalance: number;
  cashBalance: number;
  investedBalance: number;
  dailyChange: number;
  btcPrice: number;
  isLoading: boolean;
  isFetching: boolean;
  onRefresh: () => void;
}

export const PortfolioCardView: React.FC<PortfolioCardViewProps> = ({
  totalBalance,
  cashBalance,
  investedBalance,
  dailyChange,
  btcPrice,
  isLoading,
  isFetching,
  onRefresh,
}) => {
  const isPositive = dailyChange >= 0;

  return (
    <div className="relative p-8 rounded-3xl bg-[#0D111A] border border-[#1E2538] overflow-hidden shadow-2xl group hover:border-auratrade-purple/50 transition-all duration-300">
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-auratrade-purple/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-auratrade-lavender font-mono font-semibold">
            Net Liquidation & Assets
          </span>
          <div className="text-4xl font-black text-white font-mono tracking-tight mt-1 flex items-baseline gap-3">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span
              className={`text-xs font-sans px-2.5 py-1 rounded-full flex items-center gap-1 font-bold ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {isPositive ? '+' : ''}
              {dailyChange.toFixed(2)}%
            </span>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-3 rounded-2xl bg-[#131929] border border-[#1E2538] text-auratrade-lavender hover:text-white transition-colors"
          title="Refresh Ticker"
        >
          <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#161D2E] relative z-10 font-mono">
        <div>
          <span className="text-[11px] text-gray-500 block mb-1">CASH RESERVES</span>
          <span className="text-sm font-bold text-gray-200">
            ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-500 block mb-1">ACTIVE MARGIN</span>
          <span className="text-sm font-bold text-gray-200">
            ${investedBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-gray-500 block mb-1">BTC LIVE PRICE</span>
          <span className="text-sm font-bold text-auratrade-lavender">
            {isLoading && !btcPrice ? 'Syncing...' : `$${btcPrice.toLocaleString()}`}
          </span>
        </div>
      </div>
    </div>
  );
};