'use client';

import React from 'react';
import { WalletAssetRow } from './WalletAssetRow';

interface WalletAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  fiatValue: number;
  changePercent: number;
}

interface WalletAssetsListProps {
  assets: WalletAsset[];
}

export const WalletAssetsList: React.FC<WalletAssetsListProps> = ({ assets }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Crypto Assets</span>
        <span className="text-xs font-mono text-auratrade-lavender">{assets.length} Tokens</span>
      </div>

      <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[#131929]">
          {assets.map((asset) => (
            <WalletAssetRow key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
};