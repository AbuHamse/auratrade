'use client';

import React from 'react';
import Image from 'next/image';

interface AssetHeaderProps {
  name: string;
  symbol: string;
  imageUrl: string;
  actionType: 'Buy' | 'Sell' | 'Hold';
}

export const AssetHeader: React.FC<AssetHeaderProps> = ({ name, symbol, imageUrl, actionType }) => {
  const getActionBadgeStyle = (type: string) => {
    switch (type) {
      case 'Buy':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Sell':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      default:
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#131929] border border-[#1E2538] flex items-center justify-center overflow-hidden shadow-inner relative">
          {imageUrl ? (
            <Image src={imageUrl} alt={name} width={32} height={32} className="object-contain" />
          ) : (
            <span className="font-mono font-bold text-xs text-white">{symbol.slice(0, 3)}</span>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white font-mono">{name}</h4>
          <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">{symbol}</span>
        </div>
      </div>
      <span
        className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold ${getActionBadgeStyle(
          actionType
        )}`}
      >
        {actionType}
      </span>
    </div>
  );
};