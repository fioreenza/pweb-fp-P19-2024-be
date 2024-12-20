import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod } from './Crowdfund';

export interface Donation extends Document {
  payment_method: PaymentMethod;
  amount: number;
  bank_name?: string; 
}

const DonationSchema: Schema = new Schema({
  payment_method: { type: String, enum: [PaymentMethod.QRIS, PaymentMethod.BANK_TRANSFER], required: true },
  amount: { type: Number, required: true },
  bank_name: { type: String, required: function(this: any) { return this.payment_method === 'BANK_TRANSFER'; } }
});

export default mongoose.model<Donation>('Donation', DonationSchema);
