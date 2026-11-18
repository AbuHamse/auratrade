import { Request, Response } from 'express';
import { z } from 'zod';
import { WatchlistService } from '../services/watchlistService';
import { asyncHandler, APIError } from '../middleware/errorHandler';

// Define Zod schema for watchlist request validation
const watchlistSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  symbol: z.string().min(3, 'Symbol must be at least 3 characters').toUpperCase(),
});

export class WatchlistController {
  public static getWatchlist = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    if (!userId) {
      throw new APIError('Missing userId parameter.', 400);
    }

    const symbols = await WatchlistService.getWatchlist(userId);
    res.status(200).json({ success: true, data: symbols });
  });

  public static addSymbol = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validationResult = watchlistSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new APIError(validationResult.error.errors[0].message, 400);
    }

    const { userId, symbol } = validationResult.data;
    const updatedSymbols = await WatchlistService.addSymbol(userId, symbol);
    res.status(200).json({ success: true, message: 'Symbol added to watchlist', data: updatedSymbols });
  });

  public static removeSymbol = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validationResult = watchlistSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new APIError(validationResult.error.errors[0].message, 400);
    }

    const { userId, symbol } = validationResult.data;
    const updatedSymbols = await WatchlistService.removeSymbol(userId, symbol);
    res.status(200).json({ success: true, message: 'Symbol removed from watchlist', data: updatedSymbols });
  });
}