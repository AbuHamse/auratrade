'use client';

import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { PortfolioHeroCard } from '../components/dashboard/PortfolioHeroCard';
import { WatchlistTickerCard } from '../components/dashboard/WatchlistTickerCard';
import { QuickTradePanel } from '../components/trading/QuickTradePanel';
import { Plus, RefreshCcw } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white">
      {/* 1. Global Navigation Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between mb-10 pb-6 border-b border-[#131929]">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-mono">
              TRADING DASHBOARD
            </h1>
            <p className="text-xs text-auratrade-lavender font-mono mt-1">
              Personal Simulation & Risk Management Engine
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D111A] border border-[#1E2538] text-xs font-mono font-semibold text-gray-300 hover:text-white hover:border-auratrade-purple transition-all">
              <RefreshCcw size={14} />
              Sync Tickers
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-auratrade-purple to-auratrade-indigo text-xs font-mono font-semibold text-white shadow-lg shadow-auratrade-purple/20 hover:opacity-95 transition-all">
              <Plus size={14} />
              New Paper Trade
            </button>
          </div>
        </header>

        {/* Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Portfolio Hero & Watchlist Tickers (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <PortfolioHeroCard />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                  Watched Assets
                </h3>
                <span className="text-xs font-mono text-auratrade-lavender cursor-pointer hover:underline">
                  Manage Watchlist
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <WatchlistTickerCard coinId="bitcoin" symbol="BTCUSDT" name="Bitcoin" />
                <WatchlistTickerCard coinId="ethereum" symbol="ETHUSDT" name="Ethereum" />
                <WatchlistTickerCard coinId="solana" symbol="SOLUSDT" name="Solana" />
              </div>
            </div>
          </div>

          {/* Right Column: Quick Execution Panel (4 Cols) */}
          <div className="lg:col-span-4">
            <QuickTradePanel />
          </div>

        </div>
      </main>
    </div>
  );
}