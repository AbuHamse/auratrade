'use client';

import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { WalletHeroCard } from '../../components/wallet/WalletHeroCard';
import { WalletAssetsList } from '../../components/wallet/WalletAssetsList';

export default function WalletPage() {
  const assets = [
    { id: '1', symbol: 'SOL', name: 'Solana', amount: 0.00, fiatValue: 0.00, changePercent: 0.00 },
    { id: '2', symbol: 'ETH', name: 'Ethereum', amount: 0.00, fiatValue: 0.00, changePercent: 0.00 },
    { id: '3', symbol: 'USDT', name: 'Tether USD', amount: 87570.00, fiatValue: 87570.00, changePercent: 0.05 },
    { id: '4', symbol: 'MATIC', name: 'Polygon', amount: 0.00, fiatValue: 0.00, changePercent: 0.00 },
  ];

  const handleAction = (action: string) => {
    alert(`Triggered wallet action: ${action.toUpperCase()}`);
  };

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-6xl mx-auto">
        <header className="mb-8 pb-4 border-b border-[#131929]">
          <h1 className="text-xl font-black font-mono tracking-wide text-white">ASSET WALLET</h1>
          <p className="text-xs text-auratrade-lavender font-mono mt-0.5">CUSTODIAL RESERVES & TOKEN BALANCES</p>
        </header>

        <WalletHeroCard
          balance={420349.00}
          dailyChangeAmount={1830.00}
          dailyChangePercent={28.00}
          onActionClick={handleAction}
        />

        <WalletAssetsList assets={assets} />
      </main>
    </div>
  );
}