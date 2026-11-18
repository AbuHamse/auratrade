'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { WatchlistHeader } from '../../components/watchlist/WatchlistHeader';
import { AssetWatchCard } from '../../components/watchlist/AssetWatchCard';
import { useCryptoPrices, CoinMarketData } from '../../hooks/useCryptoPrices';
import { Star, Loader2 } from 'lucide-react';

export default function WatchlistPage() {
  const { data: cryptoMap, isLoading, error } = useCryptoPrices();

  // Convert the object map back into an array for rendering
  const coinsArray: CoinMarketData[] = cryptoMap ? Object.values(cryptoMap) : [];

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-7xl mx-auto">
        <WatchlistHeader
          onNewWatchlist={() => alert('Opening New Watchlist Modal...')}
          onNewCategory={() => alert('Opening New Category Modal...')}
        />

        <div className="flex items-center justify-between mb-6 font-mono">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-amber-400 fill-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300">My Watchlist ({coinsArray.length})</h2>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-auratrade-lavender">
              <Loader2 size={14} className="animate-spin" />
              Syncing CoinGecko API...
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
            Failed to fetch live market data. Please verify network connection.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coinsArray.map((coin) => {
            const change = coin.price_change_percentage_24h || 0;
            const actionType = change >= 5 ? 'Sell' : change <= -10 ? 'Buy' : 'Hold';

            return (
              <AssetWatchCard
  key={coin.id}
  id={coin.id}
  name={coin.name}
  symbol={coin.symbol.toUpperCase()}
  price={coin.current_price}
  changePercent={change}
  high24h={coin.high_24h}
  low24h={coin.low_24h}
  marketCap={coin.market_cap}
  imageUrl={coin.image}
  actionType={actionType}
/>
            );
          })}
        </div>
      </main>
    </div>
  );
}