'use client';

import React from 'react';
import { Plus, FolderPlus, Server } from 'lucide-react';

interface WatchlistHeaderProps {
  onNewWatchlist: () => void;
  onNewCategory: () => void;
}

export const WatchlistHeader: React.FC<WatchlistHeaderProps> = ({
  onNewWatchlist,
  onNewCategory,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#131929] gap-4">
      <div>
        <span className="text-xs uppercase tracking-widest text-auratrade-lavender font-mono font-semibold">
          Curated Asset Tracking
        </span>
        <h1 className="text-2xl font-black font-mono tracking-wide text-white mt-0.5">
          Crypto Watchlist
        </h1>
      </div>

      <div className="flex items-center gap-3 font-mono">
        <button
          onClick={onNewWatchlist}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D111A] border border-[#1E2538] text-xs font-semibold text-gray-300 hover:text-white hover:border-auratrade-purple transition-all"
        >
          <Plus size={14} className="text-auratrade-lavender" />
          New Watchlist
        </button>

        <button
          onClick={onNewCategory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D111A] border border-[#1E2538] text-xs font-semibold text-gray-300 hover:text-white hover:border-auratrade-purple transition-all"
        >
          <FolderPlus size={14} className="text-auratrade-lavender" />
          New Category
        </button>

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-auratrade-indigo/20 border border-auratrade-purple/40 text-xs font-semibold text-auratrade-lavender">
          <Server size={14} />
          Backend Linked
        </div>
      </div>
    </div>
  );
};