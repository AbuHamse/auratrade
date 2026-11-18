'use client';

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, Plus } from 'lucide-react';

interface WalletHeroCardProps {
  balance: number;
  dailyChangeAmount: number;
  dailyChangePercent: number;
  onActionClick: (action: string) => void;
}

export const WalletHeroCard: React.FC<WalletHeroCardProps> = ({
  balance,
  dailyChangeAmount,
  dailyChangePercent,
  onActionClick,
}) => {
  const isPositive = dailyChangePercent >= 0;

  const actions = [
    { id: 'receive', label: 'Receive', icon: ArrowDownLeft },
    { id: 'send', label: 'Send', icon: ArrowUpRight },
    { id: 'swap', label: 'Swap', icon: RefreshCw },
    { id: 'buy', label: 'Buy', icon: Plus },
  ];

  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#0D111A] to-[#06080F] border border-[#1E2538] overflow-hidden shadow-2xl mb-8">
      <div className="absolute top-0 right-0 w-80 h-80 bg-auratrade-purple/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Account Info / Balance Header */}
      <div className="text-center mb-8 relative z-10">
        <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">Account 1 &bull; Total Balance</span>
        <div className="text-5xl font-black font-mono text-white tracking-tight mt-1">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className={`text-xs font-mono mt-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? '+' : ''}${dailyChangeAmount.toLocaleString()} ({isPositive ? '+' : ''}{dailyChangePercent.toFixed(2)}%)
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto relative z-10 font-mono">
        {actions.map((act) => {
          const IconComponent = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onActionClick(act.id)}
              className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#131929] border border-[#1E2538] text-auratrade-lavender hover:text-white hover:border-auratrade-purple transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#05060A] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform text-white">
                <IconComponent size={16} />
              </div>
              <span className="text-xs font-bold">{act.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};