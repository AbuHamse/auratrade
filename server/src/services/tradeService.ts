import { PaperTrade, IPaperTrade } from '../models/PaperTrade';
import { User } from '../models/User';

interface OpenTradeInput {
  userId: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  amount: number;       // Margin allocated
  leverage: number;     // e.g., 1x to 20x
}

export class TradeService {
  /**
   * Calculates liquidation price based on trade type, leverage, and entry price.
   */
  public static calculateLiquidationPrice(
    type: 'LONG' | 'SHORT', 
    entryPrice: number, 
    leverage: number
  ): number {
    // Estimated maintenance margin buffer
    const maintenanceMarginRatio = 0.05; 

    if (type === 'LONG') {
      return Number((entryPrice * (1 - (1 / leverage) + maintenanceMarginRatio)).toFixed(2));
    } else {
      return Number((entryPrice * (1 + (1 / leverage) - maintenanceMarginRatio)).toFixed(2));
    }
  }

  /**
   * Opens a new paper trade position, validating user funds and calculating liquidation.
   */
  public static async openTrade(input: OpenTradeInput): Promise<IPaperTrade> {
    const { userId, symbol, type, entryPrice, amount, leverage } = input;

    // 1. Verify user exists and has enough virtual balance
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User account not found.');
    }

    if (user.balance < amount) {
      throw new Error('Insufficient virtual USDT balance for this trade amount.');
    }

    // 2. Compute liquidation price
    const liquidationPrice = this.calculateLiquidationPrice(type, entryPrice, leverage);

    // 3. Deduct margin from user balance and save
    user.balance -= amount;
    await user.save();

    // 4. Instantiate and save the paper trade record
    const paperTrade = new PaperTrade({
      userId,
      symbol,
      type,
      entryPrice,
      amount,
      leverage,
      liquidationPrice,
      status: 'OPEN',
      pnl: 0,
    });

    await paperTrade.save();
    return paperTrade;
  }

  /**
   * Fetches all paper trades for a specific user.
   */
  public static async getTradesByUser(userId: string): Promise<IPaperTrade[]> {
    return await PaperTrade.find({ userId }).sort({ createdAt: -1 });
  }

  /**
   * Closes an active paper trade, calculates PnL, and restores funds to user balance.
   */
  public static async closeTrade(tradeId: string, currentPrice: number): Promise<IPaperTrade> {
    const trade = await PaperTrade.findById(tradeId);
    if (!trade || trade.status === 'CLOSED') {
      throw new Error('Trade not found or already closed.');
    }

    const priceDiff = trade.type === 'LONG' 
      ? currentPrice - trade.entryPrice 
      : trade.entryPrice - currentPrice;

    // PnL formula: (Price Difference * Margin * Leverage) / Entry Price
    const rawPnl = (priceDiff * trade.amount * trade.leverage) / trade.entryPrice;
    const pnl = Number(rawPnl.toFixed(2));

    trade.exitPrice = currentPrice;
    trade.status = 'CLOSED';
    trade.pnl = pnl;
    trade.closedAt = new Date();
    await trade.save();

    // Restore initial margin + PnL to user balance
    const user = await User.findById(trade.userId);
    if (user) {
      user.balance += trade.amount + pnl;
      await user.save();
    }

    return trade;
  }
}