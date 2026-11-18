'use client';

import React from 'react';
import { OrderRow } from './OrderRow';

interface OrderItem {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  margin: number;
  leverage: number;
  entryPrice: number;
  status: 'OPEN' | 'EXECUTED' | 'CLOSED';
  date: string;
}

interface OrdersListProps {
  orders: OrderItem[];
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl p-12 text-center font-mono">
        <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D111A] border border-[#1E2538] rounded-3xl overflow-hidden shadow-xl">
      <div className="divide-y divide-[#131929]">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};