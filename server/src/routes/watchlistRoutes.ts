import { Router } from 'express';
import { WatchlistController } from '../controllers/watchlistController.js';

const router = Router();

router.get('/:userId', WatchlistController.getWatchlist);
router.post('/add', WatchlistController.addSymbol);
router.post('/remove', WatchlistController.removeSymbol);

export default router;