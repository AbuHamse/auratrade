'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../components/layout/Sidebar';
import { Terminal, ShieldAlert, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex bg-[#030407] min-h-screen text-gray-100 selection:bg-auratrade-purple selection:text-white font-mono">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full bg-[#0D111A] border border-[#1E2538] rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6 text-rose-400 shadow-lg">
            <ShieldAlert size={30} />
          </div>

          <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
            Error Code: 404_NOT_FOUND
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            SIGNAL LOST
          </h1>
          <p className="text-xs text-gray-400 mb-8 leading-relaxed">
            The requested trading node, route, or ledger link does not exist within the AuraTrade grid coordinates.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-br from-auratrade-purple to-auratrade-indigo text-xs font-bold text-white shadow-lg shadow-auratrade-purple/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Home size={15} />
              Return to Dashboard Root
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-3.5 rounded-xl bg-[#05060A] border border-[#1E2538] text-xs font-bold text-gray-300 hover:text-white hover:border-auratrade-purple transition-all flex items-center justify-center gap-2"
            >
              <Terminal size={15} />
              Revert to Previous Sector
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}