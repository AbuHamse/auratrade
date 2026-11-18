import { Router } from 'express';
import { TradeController } from '../controllers/tradeController';

const router = Router();

router.post('/open', TradeController.openPaperTrade);
router.get('/user/:userId', TradeController.getUserTrades);
router.post('/close', TradeController.closePaperTrade);

export default router;