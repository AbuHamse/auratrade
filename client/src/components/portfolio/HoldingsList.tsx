'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface HoldingItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  fiatValue: number;
  pnlAmount: number;
  pnlPercent: number;
}

interface HoldingsListProps {
  holdings: HoldingItem[];
}

export const HoldingsList: React.FC<HoldingsListProps> = ({ holdings }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Highest Holdings</span>
          <ArrowUpDown size={14} className="text-gray-500 cursor-pointer" />
        </div>
        <span className="text-xs font-mono text-auratrade-lavender">{holdings.length} Assets Tracked</span>
      </div>

      <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[#131929]">
          {holdings.map((item) => {
            const isPositive = item.pnlPercent >= 0;
            return (
              <div key={item.id} className="p-5 flex items-center justify-between hover:bg-[#121826]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#161D2E] border border-[#1E2538] flex items-center justify-center font-mono font-bold text-xs text-auratrade-lavender shadow">
                    {item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{item.symbol} <span className="text-xs text-gray-500 font-normal">{item.name}</span></h4>
                    <span className="text-xs text-gray-400 font-mono">{item.amount} {item.symbol}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-white">${item.fiatValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <div className={`text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? '+' : ''}${item.pnlAmount.toLocaleString()} ({isPositive ? '+' : ''}{item.pnlPercent}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};