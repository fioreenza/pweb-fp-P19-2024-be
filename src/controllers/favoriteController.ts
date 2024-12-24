import { Request, Response } from 'express';

import { getFavoriteByUserIdService } from '../services/favoriteService';
import { createFavoriteService } from '../services/favoriteService';
import { removeFavoriteService } from '../services/favoriteService';

// add createFavorite function
export const addcreateFavorite = async (req: Request, res: Response) => {
  try {
    const { user_id, crowdfund_id } = req.body;

    // Validasi input
    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({ success: false, message: 'User ID is required and must be a string' });
    }

    if (!crowdfund_id || typeof crowdfund_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Crowdfund ID is required and must be a string' });
    }

    const result = await createFavoriteService(user_id, crowdfund_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

// unfavorite function
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { user_id, crowdfund_id } = req.body;

    // Validasi input
    if (!user_id || typeof user_id !== 'string') {
      return res.status(400).json({ success: false, message: 'User ID is required and must be a string' });
    }

    if (!crowdfund_id || typeof crowdfund_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Crowdfund ID is required and must be a string' });
    }

    const result = await removeFavoriteService(user_id, crowdfund_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};


export const getFavoriteCrowdfunds = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const result = await getFavoriteByUserIdService(user_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};
