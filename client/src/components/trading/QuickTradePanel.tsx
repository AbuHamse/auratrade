'use client';

import React, { useState } from 'react';
import { QuickTradeView } from './QuickTradeView';

export const QuickTradePanel: React.FC = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [margin, setMargin] = useState<number>(100);
  const [leverage, setLeverage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  const handleExecuteTrade = async (type: 'BUY' | 'SELL') => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/trade/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '65f1a2b3c4d5e6f7a8b9c0d1', // Seeded test user ID
          symbol,
          type,
          margin,
          leverage,
        }),
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        alert(`Order Executed Successfully! Position ID: ${data.data._id}`);
      } else {
        alert(`Execution Error: ${data.error || 'Invalid parameters'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend trade execution engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuickTradeView
      symbol={symbol}
      setSymbol={setSymbol}
      margin={margin}
      setMargin={setMargin}
      leverage={leverage}
      setLeverage={setLeverage}
      loading={loading}
      onExecute={handleExecuteTrade}
    />
  );
};