import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '../providers/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AuraTrade | Personal Crypto Paper Trading Simulator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-auratrade-void text-gray-100 antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}