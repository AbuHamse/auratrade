'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { PortfolioChart } from '../../components/portfolio/PortfolioChart';
import { HoldingsList } from '../../components/portfolio/HoldingsList';
import { Search } from 'lucide-react';

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState('1W');
  const [searchQuery, setSearchQuery] = useState('');

  const holdings = [
    { id: '1', symbol: 'BTC', name: 'Bitcoin', amount: 1.12, fiatValue: 6539.66, pnlAmount: 616.17, pnlPercent: 10.40 },
    { id: '2', symbol: 'NEO', name: 'NEO', amount: 197.42, fiatValue: 2004.05, pnlAmount: -163.02, pnlPercent: -5.07 },
    { id: '3', symbol: 'ETH', name: 'Ethereum', amount: 3.87, fiatValue: 653.87, pnlAmount: 63.90, pnlPercent: 5.18 },
    { id: '4', symbol: 'XRP', name: 'XRP', amount: 1447.95, fiatValue: 443.82, pnlAmount: -16.60, pnlPercent: -2.78 },
    { id: '5', symbol: 'BCH', name: 'Bitcoin Cash', amount: 1.45, fiatValue: 289.13, pnlAmount: 12.40, pnlPercent: 4.12 },
  ];

  const filteredHoldings = holdings.filter(
    (h) => h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-[#131929]">
          <div>
            <h1 className="text-xl font-black font-mono tracking-wide text-white">MAIN PORTFOLIO</h1>
            <p className="text-xs text-auratrade-lavender font-mono mt-0.5">CRYPTO ASSET ALLOCATION & HOLDINGS</p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search holdings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0D111A] border border-[#1E2538] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-auratrade-purple w-60"
            />
          </div>
        </header>

        <PortfolioChart timeframe={timeframe} onTimeframeChange={setTimeframe} />
        <HoldingsList holdings={filteredHoldings} />
      </main>
    </div>
  );
}