'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useCryptoPrices } from '../../../hooks/useCryptoPrices';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, DollarSign, BarChart2, ShieldAlert } from 'lucide-react';
import Image from 'next/image';

export default function CoinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const coinId = params?.coinId as string;

  const { data: cryptoMap, isLoading } = useCryptoPrices();
  const coin = cryptoMap ? cryptoMap[coinId] : null;

  if (isLoading) {
    return (
      <div className="flex bg-[#030407] min-h-screen text-gray-100 items-center justify-center font-mono text-xs text-auratrade-lavender">
        Loading coin metrics...
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="flex bg-[#030407] min-h-screen text-gray-100 items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-400">Asset data not found or invalid coin ID.</p>
          <button
            onClick={() => router.push('/watchlist')}
            className="px-4 py-2 rounded-xl bg-auratrade-indigo text-white text-xs font-bold"
          >
            Return to Watchlist
          </button>
        </div>
      </div>
    );
  }

  const change = coin.price_change_percentage_24h || 0;
  const isPositive = change >= 0;

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white font-mono">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-5xl mx-auto">
        {/* Back Navigation Bar */}
        <button
          onClick={() => router.push('/watchlist')}
          className="flex items-center gap-2 text-xs text-auratrade-lavender hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Watchlist
        </button>

        {/* Header Hero */}
        <div className="flex items-center justify-between p-8 rounded-3xl bg-gradient-to-b from-[#0D111A] to-[#06080F] border border-[#1E2538] shadow-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#131929] border border-[#1E2538] flex items-center justify-center overflow-hidden shadow-inner relative">
              <Image src={coin.image} alt={coin.name} width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{coin.name}</h1>
              <span className="text-xs uppercase text-gray-500 tracking-widest">{coin.symbol} / USD</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black text-white">
              ${coin.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className={`flex items-center justify-end gap-1 text-xs font-bold mt-1 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isPositive ? '+' : ''}{change.toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        {/* Numerical Data Grid (No Charts) */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
          <Activity size={15} className="text-auratrade-lavender" />
          Quantitative Market Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: 24h High/Low Spread */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] uppercase text-gray-500 block mb-2 flex items-center gap-1.5">
              <BarChart2 size={13} className="text-auratrade-lavender" />
              24-Hour Trading Range
            </span>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">24h High:</span>
                <span className="text-emerald-400 font-bold">${coin.high_24h?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">24h Low:</span>
                <span className="text-rose-400 font-bold">${coin.low_24h?.toLocaleString()}</span>
              </div>
            </div>
          </div>

            {/* Card 2: Market Capitalization */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] uppercase text-gray-500 block mb-2 flex items-center gap-1.5">
              <DollarSign size={13} className="text-auratrade-lavender" />
              Capitalization Metrics
            </span>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Total Market Cap:</span>
                <span className="text-white font-bold">${(coin.market_cap / 1e9).toFixed(2)} Billion</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Valuation Tier:</span>
                <span className="text-auratrade-lavender font-bold">Primary Asset</span>
              </div>
            </div>
          </div>

          {/* Card 3: Execution Risk Assessment */}
          <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] uppercase text-gray-500 block mb-2 flex items-center gap-1.5">
              <ShieldAlert size={13} className="text-amber-400" />
              Volatility Index
            </span>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Volatility Status:</span>
                <span className={Math.abs(change) > 10 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {Math.abs(change) > 10 ? 'High Volatility' : 'Stable Range'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Recommended Action:</span>
                <span className="text-white font-bold">{change <= -10 ? 'Accumulate (Buy)' : change >= 5 ? 'Take Profit (Sell)' : 'Hold Position'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}