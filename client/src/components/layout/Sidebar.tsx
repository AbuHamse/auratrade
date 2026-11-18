'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PieChart, ArrowLeftRight, Wallet, Bookmark, Settings, HelpCircle } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'Orders', href: '/orders', icon: ArrowLeftRight },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Watchlist', href: '/watchlist', icon: Bookmark },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-auratrade-card border-r border-auratrade-border flex flex-col justify-between p-6 select-none h-screen sticky top-0">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-auratrade-purple to-auratrade-lavender flex items-center justify-center shadow-lg shadow-auratrade-purple/20">
            <span className="font-bold text-white text-sm">AT</span>
          </div>
          <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-gray-200 to-auratrade-lavender bg-clip-text text-transparent">
            AuraTrade
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-auratrade-indigo text-white border border-auratrade-purple/40 shadow-inner'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-auratrade-border/40'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-auratrade-lavender' : 'text-gray-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Support / Settings Panel */}
      <div className="space-y-2 pt-6 border-t border-auratrade-border/60">
        <Link
          href="/settings"
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-auratrade-border/40 transition-colors"
        >
          <Settings size={18} />
          Settings
        </Link>
        <button
          onClick={() => alert('AuraTrade v1.0 - Personal Trading Simulator')}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-auratrade-lavender bg-auratrade-indigo/50 hover:bg-auratrade-indigo border border-auratrade-border transition-all"
        >
          <HelpCircle size={18} />
          Support & Info
        </button>
      </div>
    </aside>
  );
};