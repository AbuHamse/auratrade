'use client';

import React from 'react';
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleBand } from '@tanstack/charts/scales/band';
import { Chart } from '@tanstack/charts/react';
import { tooltip } from '@tanstack/charts/tooltip';

const portfolioHistory = [
  { time: 'Mon', value: 7100 },
  { time: 'Tue', value: 7250 },
  { time: 'Wed', value: 6900 },
  { time: 'Thu', value: 7320 },
  { time: 'Fri', value: 7150 },
  { time: 'Sat', value: 7400 },
  { time: 'Sun', value: 7459 },
];

const portfolioChartDef = defineChart({
  data: portfolioHistory,
  scales: {
    x: { scale: scaleBand },
    y: { scale: scaleLinear, nice: true },
  },
  marks: [
    lineY({
      x: (d) => d.time,
      y: (d) => d.value,
      stroke: '#10B981',
      strokeWidth: 3,
    }),
  ],
  plugins: [tooltip],
});

interface PortfolioChartProps {
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ timeframe, onTimeframeChange }) => {
  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#0D111A] to-[#06080F] border border-[#1E2538] overflow-hidden shadow-2xl mb-8">
      <div className="absolute top-0 right-0 w-80 h-80 bg-auratrade-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-6 relative z-10">
        <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">Total Crypto Net Worth</span>
        <div className="text-5xl font-black font-mono text-white tracking-tight mt-1">
          $7,459.23
        </div>
        <div className="text-xs font-mono text-emerald-400 mt-1">
          -$483.29 <span className="font-bold">(+6.39%)</span>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-6 relative z-15 font-mono">
        {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange(tf)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === tf
                ? 'bg-auratrade-indigo text-white border border-auratrade-purple/50 shadow-inner'
                : 'text-gray-400 hover:bg-[#131929] hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="h-48 w-full relative z-10">
        <Chart definition={portfolioChartDef} ariaLabel="Portfolio Net Worth Chart" />
      </div>
    </div>
  );
};