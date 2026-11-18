'use client';

import React from 'react';
import Image from 'next/image';

interface AssetAvatarProps {
  symbol: string;
  imageUrl?: string;
  name: string;
}

export const AssetAvatar: React.FC<AssetAvatarProps> = ({ symbol, imageUrl, name }) => {
  return (
    <div className="w-14 h-14 rounded-2xl bg-[#131929] border border-[#1E2538] flex items-center justify-center overflow-hidden shadow-inner relative group-hover:scale-105 transition-transform">
      {imageUrl ? (
        <Image src={imageUrl} alt={name} width={36} height={36} className="object-contain" />
      ) : (
        <span className="font-mono font-bold text-sm text-white">{symbol.slice(0, 3)}</span>
      )}
    </div>
  );
};