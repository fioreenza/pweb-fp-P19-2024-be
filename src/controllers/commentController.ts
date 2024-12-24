import { Request, Response } from 'express';
import { createCommentService, getCommentByCrowdfundIdService } from '../services/commentService';


// create comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { crowdfund_id, message, user_id } = req.body;

    // Validasi input
    if (!crowdfund_id || typeof crowdfund_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Crowdfund ID is required and must be a string' });
    }

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required and must be a string' });
    }
    
    const result = await createCommentService(crowdfund_id, message, user_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};


// get comment by crowdfund id
export const getCommentByCrowdfundId = async (req: Request, res: Response) => {
  try {
    const { crowdfund_id } = req.params;

    const result = await getCommentByCrowdfundIdService(crowdfund_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};