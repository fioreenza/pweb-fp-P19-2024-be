import { Request, Response } from 'express';
import Feedback from './feedback';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
