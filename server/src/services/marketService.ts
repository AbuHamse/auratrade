import WebSocket from 'ws';
import { Server as SocketIOServer } from 'socket.io';

export class MarketService {
  private static ws: WebSocket | null = null;
  private static io: SocketIOServer | null = null;
  // Default active symbols for tracking & watchlists
  private static activeSymbols: Set<string> = new Set(['btcusdt', 'ethusdt', 'solusdt', 'xrpusdt']);

  /**
   * Initializes the Market Service and connects to Binance live streams
   */
  public static init(ioInstance: SocketIOServer): void {
    this.io = ioInstance;
    this.connectBinance();
  }

  private static connectBinance(): void {
    const streams = Array.from(this.activeSymbols)
      .map((s) => `${s.toLowerCase()}@ticker`)
      .join('/');

    const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;

    console.log(`[MarketService] Connecting to Binance live stream...`);
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log('🟢 [MarketService] Successfully connected to Binance Live Ticker Stream');
    });

    this.ws.on('message', (data: WebSocket.RawData) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed && parsed.data) {
          const ticker = parsed.data;
          const payload = {
            symbol: ticker.s,       // e.g., "BTCUSDT"
            price: ticker.c,        // Current trade price
            high24h: ticker.h,      // 24h High
            low24h: ticker.l,       // 24h Low
            volume24h: ticker.v,    // 24h Volume
            priceChangePercent: ticker.P, // 24h Price Change %
            timestamp: Date.now(),
          };

          // Broadcast real-time price update to all connected Socket.io frontend clients
          if (this.io) {
            this.io.emit('marketTicker', payload);
          }
        }
      } catch (error) {
        console.error('[MarketService] Error parsing Binance ticker message:', error);
      }
    });

    this.ws.on('error', (error) => {
      console.error('🔴 [MarketService] Binance WebSocket Error:', error);
    });

    this.ws.on('close', () => {
      console.warn('⚠️ [MarketService] Binance WebSocket Disconnected. Attempting reconnection in 5 seconds...');
      setTimeout(() => {
        this.connectBinance();
      }, 5000);
    });
  }

  /**
   * Dynamically add a symbol to the live stream if a user adds it to their watchlist
   */
  public static addSymbol(symbol: string): void {
    const lower = symbol.toLowerCase();
    if (!this.activeSymbols.has(lower)) {
      this.activeSymbols.add(lower);
      // Restart connection to include the new symbol stream
      if (this.ws) {
        this.ws.terminate();
      }
      this.connectBinance();
    }
  }
}
