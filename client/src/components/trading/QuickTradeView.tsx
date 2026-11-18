'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface QuickTradeViewProps {
  symbol: string;
  setSymbol: (val: string) => void;
  margin: number;
  setMargin: (val: number) => void;
  leverage: number;
  setLeverage: (val: number) => void;
  loading: boolean;
  onExecute: (type: 'BUY' | 'SELL') => void;
}

export const QuickTradeView: React.FC<QuickTradeViewProps> = ({
  symbol,
  setSymbol,
  margin,
  setMargin,
  leverage,
  setLeverage,
  loading,
  onExecute,
}) => {
  return (
    <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 flex flex-col justify-between shadow-2xl h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Zap size={15} className="text-auratrade-lavender" />
            Quick Execution
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-auratrade-indigo/50 text-auratrade-lavender border border-[#1E2538]">
            Margin Engine
          </span>
        </div>

        <div className="space-y-4 font-mono">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Asset Pair</label>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-[#05060A] border border-[#1E2538] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-auratrade-purple transition-colors"
            >
              <option value="BTCUSDT">BTCUSDT</option>
              <option value="ETHUSDT">ETHUSDT</option>
              <option value="SOLUSDT">SOLUSDT</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Margin Amount (USD)</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full bg-[#05060A] border border-[#1E2538] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-auratrade-purple transition-colors"
              placeholder="100.00"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Leverage</span>
              <span className="text-white font-bold">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full accent-auratrade-purple cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-8">
        <button
          onClick={() => onExecute('BUY')}
          disabled={loading}
          className="py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs hover:bg-emerald-500/20 transition-all shadow-lg shadow-emerald-500/5 disabled:opacity-50"
        >
          {loading ? 'EXECUTING...' : 'LONG (BUY)'}
        </button>
        <button
          onClick={() => onExecute('SELL')}
          disabled={loading}
          className="py-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono font-bold text-xs hover:bg-rose-500/20 transition-all shadow-lg shadow-rose-500/5 disabled:opacity-50"
        >
          {loading ? 'EXECUTING...' : 'SHORT (SELL)'}
        </button>
      </div>
    </div>
  );
};