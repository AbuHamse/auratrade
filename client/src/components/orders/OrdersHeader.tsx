'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface OrdersHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}) => {
  const filters = ['ALL', 'OPEN', 'EXECUTED', 'CLOSED'];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-[#131929] gap-4">
      <div>
        <h1 className="text-xl font-black font-mono tracking-wide text-white">TRADE ORDERS</h1>
        <p className="text-xs text-auratrade-lavender font-mono mt-0.5">ACTIVE & HISTORICAL MARGIN POSITIONS</p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex bg-[#0D111A] border border-[#1E2538] rounded-xl p-1 font-mono">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'bg-auratrade-indigo text-white shadow-inner'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0D111A] border border-[#1E2538] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-auratrade-purple w-50"
          />
        </div>
      </div>
    </div>
  );
};