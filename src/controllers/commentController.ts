import { Request, Response } from 'express';
import Comment, { IComment } from '../models/Comment';
import Crowdfund from '../models/Crowdfund';

// Add a new comment to a crowdfund
export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, content, crowdfundId } = req.body;

        // Validate required fields
        if (!user || !content || !crowdfundId) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Create a new comment
        const newComment = new Comment({ user, content, crowdfundId });
        await newComment.save();

        // Link the comment to the crowdfund
        await Crowdfund.findByIdAndUpdate(crowdfundId, {
            $push: { comments: newComment._id },
        });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get all comments for a specific crowdfund
export const getCommentsByCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { crowdfundId } = req.params;

        const comments = await Comment.find({ crowdfundId }).sort({ createdAt: -1 });

        if (!comments.length) {
            res.status(404).json({ message: 'No comments found for this crowdfund' });
            return;
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Delete a comment by its ID
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { commentId } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        // Remove the comment ID from the crowdfund's comment list
        await Crowdfund.findByIdAndUpdate(deletedComment.crowdfundId, {
            $pull: { comments: deletedComment._id },
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
