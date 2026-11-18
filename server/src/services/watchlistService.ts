import { Watchlist, IWatchlist } from '../models/Watchlist';
import { User } from '../models/User';

export class WatchlistService {
  /**
   * Fetches a user's watchlist symbols.
   */
  public static async getWatchlist(userId: string): Promise<string[]> {
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      // Create a default watchlist if none exists
      watchlist = await Watchlist.create({ userId, symbols: ['BTCUSDT', 'ETHUSDT'] });
    }
    return watchlist.symbols;
  }

  /**
   * Adds a symbol to the user's watchlist.
   */
  public static async addSymbol(userId: string, symbol: string): Promise<string[]> {
    const upperSymbol = symbol.toUpperCase();
    
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId, symbols: [upperSymbol] });
    } else {
      if (!watchlist.symbols.includes(upperSymbol)) {
        watchlist.symbols.push(upperSymbol);
        watchlist.updatedAt = new Date();
        await watchlist.save();
      }
    }
    return watchlist.symbols;
  }

  /**
   * Removes a symbol from the user's watchlist.
   */
  public static async removeSymbol(userId: string, symbol: string): Promise<string[]> {
    const upperSymbol = symbol.toUpperCase();
    
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      throw new Error('Watchlist not found for this user.');
    }

    watchlist.symbols = watchlist.symbols.filter((s) => s !== upperSymbol);
    watchlist.updatedAt = new Date();
    await watchlist.save();

    return watchlist.symbols;
  }
}