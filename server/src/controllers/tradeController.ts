import { Request, Response } from 'express';
import { z } from 'zod';
import { TradeService } from '../services/tradeService.js';
import { asyncHandler, APIError } from '../middleware/errorHandler.js';

// Define Zod schemas for trade operations
const openTradeSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  symbol: z.string().min(3, 'Symbol must be at least 3 characters').toUpperCase(),
  type: z.enum(['LONG', 'SHORT'], { errorMap: () => ({ message: "Type must be either 'LONG' or 'SHORT'" }) }),
  entryPrice: z.number().positive('Entry price must be a positive number'),
  amount: z.number().positive('Amount/margin must be a positive number'),
  leverage: z.number().min(1, 'Leverage must be at least 1x').max(100, 'Max leverage is 100x'),
});

const closeTradeSchema = z.object({
  tradeId: z.string().min(1, 'Trade ID is required'),
  currentPrice: z.number().positive('Current price must be a positive number'),
});

export class TradeController {
  public static openPaperTrade = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validationResult = openTradeSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new APIError(validationResult.error.errors[0].message, 400);
    }

    const trade = await TradeService.openTrade(validationResult.data);
    res.status(201).json({ success: true, data: trade });
  });

  public static getUserTrades = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    if (!userId) {
      throw new APIError('Missing userId parameter.', 400);
    }

    const trades = await TradeService.getTradesByUser(userId);
    res.status(200).json({ success: true, data: trades });
  });

  public static closePaperTrade = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validationResult = closeTradeSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new APIError(validationResult.error.errors[0].message, 400);
    }

    const { tradeId, currentPrice } = validationResult.data;
    const closedTrade = await TradeService.closeTrade(tradeId, currentPrice);
    res.status(200).json({ success: true, message: 'Trade closed successfully', data: closedTrade });
  });
}