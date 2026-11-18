import mongoose, { Schema, Document } from 'mongoose';

export interface IPaperTrade extends Document {
  userId: mongoose.Types.ObjectId;
  symbol: string;         // e.g., "BTCUSDT", "ETHUSDT"
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice?: number;
  amount: number;         // Margin allocated in USDT
  leverage: number;       // e.g., 1x to 20x
  liquidationPrice: number;
  status: 'OPEN' | 'CLOSED';
  pnl: number;            // Profit and Loss
  createdAt: Date;
  closedAt?: Date;
}

const PaperTradeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  symbol: { type: String, required: true, uppercase: true },
  type: { type: String, enum: ['LONG', 'SHORT'], required: true },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number },
  amount: { type: Number, required: true },
  leverage: { type: Number, required: true, default: 1, min: 1, max: 100 },
  liquidationPrice: { type: Number, required: true },
  status: { type: String, enum: ['OPEN', 'CLOSED'], default: 'OPEN', index: true },
  pnl: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  closedAt: { type: Date },
});

export const PaperTrade = mongoose.model<IPaperTrade>('PaperTrade', PaperTradeSchema);