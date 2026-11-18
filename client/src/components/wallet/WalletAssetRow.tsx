'use client';

import React from 'react';

interface WalletAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  fiatValue: number;
  changePercent: number;
}

interface WalletAssetRowProps {
  asset: WalletAsset;
}

export const WalletAssetRow: React.FC<WalletAssetRowProps> = ({ asset }) => {
  const isPositive = asset.changePercent >= 0;

  return (
    <div className="p-5 flex items-center justify-between hover:bg-[#121826]/50 transition-colors font-mono">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#161D2E] border border-[#1E2538] flex items-center justify-center font-mono font-bold text-xs text-auratrade-lavender shadow">
          {asset.symbol.slice(0, 3)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{asset.name}</h4>
          <span className="text-xs text-gray-500">{asset.amount} {asset.symbol}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-white">
          ${asset.fiatValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className={`text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};