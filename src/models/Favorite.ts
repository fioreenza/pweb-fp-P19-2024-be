import mongoose, { Schema, Document } from 'mongoose';

export interface FavoriteCrowdfund extends Document {
  user_id: string;
  crowdfund_id: string;
}

const FavoriteCrowdfundSchema: Schema = new Schema({
  user_id: { type: String },
  crowdfund_id: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true }
});

export default mongoose.model<FavoriteCrowdfund>('FavoriteCrowdfund', FavoriteCrowdfundSchema);
