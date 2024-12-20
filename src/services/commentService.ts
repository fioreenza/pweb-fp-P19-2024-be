import Comment from '../models/Comment';

export const createCommentService = async (message: string) => {
  try {
    const newComment = new Comment({ message });
    await newComment.save();
    return { success: true, message: 'Comment successfully added', data: newComment };
  } catch (error) {
    throw new Error('Failed to add comment');
  }
};
