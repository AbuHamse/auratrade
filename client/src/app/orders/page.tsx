'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { OrdersHeader } from '../../components/orders/OrdersHeader';
import { OrdersList } from '../../components/orders/OrdersList';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Sample order ledger
  const orders = [
    { id: '1', symbol: 'BTCUSDT', type: 'BUY' as const, margin: 250, leverage: 20, entryPrice: 91800, status: 'OPEN' as const, date: 'Today, 14:22' },
    { id: '2', symbol: 'ETHUSDT', type: 'SELL' as const, margin: 100, leverage: 10, entryPrice: 3480, status: 'EXECUTED' as const, date: 'Today, 11:05' },
    { id: '3', symbol: 'SOLUSDT', type: 'BUY' as const, margin: 150, leverage: 15, entryPrice: 182.5, status: 'CLOSED' as const, date: 'Yesterday, 19:40' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white">
      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto max-w-6xl mx-auto">
        <OrdersHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <OrdersList orders={filteredOrders} />
      </main>
    </div>
  );
}