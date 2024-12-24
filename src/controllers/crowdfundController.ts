import { Request, Response } from 'express';
import { createCrowdfundService, getAllCrowdfundsService, getCrowdfundByIDService} from '../services/crowdfundService';

// Get All Crowdfunds (only OPEN)
export const getAllCrowdfunds = async (req: Request, res: Response) => {
  try {
    const result = await getAllCrowdfundsService();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

// Create a New Crowdfund
export const createCrowdfund = async (req: Request, res: Response) => {
  try {
    const { name, target, description } = req.body;

    // Validasi input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ success: false, message: 'Name is required and must be a string' });
    }

    // target berupa string dan harus > 0
    if (!target || target <= 0) {
      return res.status(400).json({ success: false, message: 'Target is required and must be a number greater than 0' });
    }

    const result = await createCrowdfundService({ name, target, description });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

// Get Crowdfund by ID
export const getCrowdfundByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getCrowdfundByIDService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};
