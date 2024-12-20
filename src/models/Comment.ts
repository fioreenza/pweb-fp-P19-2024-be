import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  message: string;
}

const CommentSchema: Schema = new Schema({
  message: { type: String, required: true },
});

export default mongoose.model<Comment>('Comment', CommentSchema);
