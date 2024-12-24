import mongoose, { Schema, Document } from 'mongoose';

export enum CrowdfundStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export enum PaymentMethod {
    QRIS = 'QRIS',
    BANK_TRANSFER = 'BANK_TRANSFER'
  }

export interface Crowdfund extends Document {
  name: string;
  target: number;
  current_donation: number;
  description: string;
  status: CrowdfundStatus;
  created_at: Date;
}

const CrowdfundSchema: Schema = new Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  current_donation: { type: Number, default: 0 },
  status: { type: String, enum: Object.values(CrowdfundStatus), default: CrowdfundStatus.OPEN },
  created_at: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

export default mongoose.model<Crowdfund>('Crowdfund', CrowdfundSchema);