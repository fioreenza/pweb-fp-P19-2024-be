import { Request, Response } from 'express';
import { addFavoriteCrowdfundService } from '../services/favoriteService';
import { getFavoriteByUserIdService } from '../services/favoriteService';
import { getAllFavoritesService } from '../services/favoriteService';

export const addFavoriteCrowdfund = async (req: Request, res: Response) => {
  try {
    const { user_id, crowdfund_id } = req.body;

    if (!crowdfund_id) {
      return res.status(400).json({ success: false, message: 'User ID and Crowdfund ID are required' });
    }

    const result = await addFavoriteCrowdfundService(user_id, crowdfund_id);
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

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const result = await getAllFavoritesService();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: (error as any).message });
    }
}