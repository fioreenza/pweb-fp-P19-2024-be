import Comment from "../models/Comment";

// createCommentService function to create a new comment
export const createCommentService = async (crowdfund_id: string, message: string, user_id: string) => {
  try {
    const newComment = new Comment({ crowdfund_id, message, user_id });
    await newComment.save();
    return { success: true, message: 'Comment successfully created', data: newComment };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to create comment' };
  }
};

// get comment by crowdfund id
export const getCommentByCrowdfundIdService = async (crowdfund_id: string) => {
  try {
    const comments = await Comment.find({ crowdfund_id }).populate('user_id');
    return { success: true, data: comments };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to fetch comments' };
  }
};
