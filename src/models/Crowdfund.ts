import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Crowdfund
export interface ICrowdfund extends Document {
    name: string;
    targetDonation: number;
    currentDonation: number;
    status: 'open' | 'close';
    comments: mongoose.Types.ObjectId[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define schema for Crowdfund
const crowdfundSchema = new Schema<ICrowdfund>(
    {
        name: { type: String, required: true },
        targetDonation: { type: Number, required: true },
        currentDonation: { type: Number, default: 0 },
        status: { type: String, enum: ['open', 'close'], default: 'open' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        createdBy: { type: String, required: true },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt
);

export default mongoose.model<ICrowdfund>('Crowdfund', crowdfundSchema);
