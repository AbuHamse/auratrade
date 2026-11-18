'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

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

interface OrderRowProps {
  order: OrderItem;
}

export const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const isLong = order.type === 'BUY';

  return (
    <div className="p-5 flex items-center justify-between hover:bg-[#121826]/50 transition-colors font-mono">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow ${
            isLong
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {isLong ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white">{order.symbol}</h4>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                isLong ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {order.type} {order.leverage}X
            </span>
          </div>
          <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <Clock size={12} /> {order.date}
          </span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-bold text-white">
          Margin: ${order.margin.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-400">
          Entry: ${order.entryPrice.toLocaleString()} &bull; <span className="text-auratrade-lavender">{order.status}</span>
        </div>
      </div>
    </div>
  );
};