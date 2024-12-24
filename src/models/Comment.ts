import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  crowdfund_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  message: string;
  created_at: Date;
}

const CommentSchema: Schema = new Schema({
  message: { type: String, required: true },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  crowdfund_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Crowdfund', // Reference to the Crowdfund model
        required: true 
      }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: false } });

export default mongoose.model<Comment>('Comment', CommentSchema);
