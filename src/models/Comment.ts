import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Comment
export interface IComment extends Document {
    user: string;
    content: string;
    crowdfundId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define schema for Comment
const commentSchema = new Schema<IComment>(
    {
        user: { type: String, required: true },
        content: { type: String, required: true },
        crowdfundId: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt
);

export default mongoose.model<IComment>('Comment', commentSchema);
