import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    user: string;
    content: string;
    crowdfundId: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    user: { type: String, required: true },
    content: { type: String, required: true },
    crowdfundId: { type: Schema.Types.ObjectId, ref: 'Crowdfund', required: true },
});

export default mongoose.model<IComment>('Comment', commentSchema);
