import { Request, Response } from 'express';
import { createCommentService } from '../services/commentService';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    // Validasi input
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const result = await createCommentService(message);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};
