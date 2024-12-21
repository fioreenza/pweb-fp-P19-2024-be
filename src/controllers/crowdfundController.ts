import { Request, Response } from 'express';
import Crowdfund, { ICrowdfund } from '../models/Crowdfund';
import Comment, { IComment } from '../models/Comment';

// Get all crowdfunds
export const getAllCrowdfunds = async (req: Request, res: Response): Promise<void> => {
    try {
        const crowdfunds: ICrowdfund[] = await Crowdfund.find();
        res.status(200).json(crowdfunds);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get crowdfund details
export const getCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const crowdfund = await Crowdfund.findById(req.params.id).populate('comments');
        if (!crowdfund) {
            res.status(404).json({ message: 'Crowdfund not found' });
            return;
        }
        res.status(200).json(crowdfund);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Create new crowdfund
export const createCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, targetDonation, createdBy } = req.body;
        const newCrowdfund = new Crowdfund({ name, targetDonation, createdBy });
        await newCrowdfund.save();
        res.status(201).json(newCrowdfund);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Update crowdfund
export const updateCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, targetDonation, status } = req.body;
        const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
            req.params.id,
            { name, targetDonation, status },
            { new: true }
        );
        if (!updatedCrowdfund) {
            res.status(404).json({ message: 'Crowdfund not found' });
            return;
        }
        res.status(200).json(updatedCrowdfund);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Delete crowdfund
export const deleteCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedCrowdfund = await Crowdfund.findByIdAndDelete(req.params.id);
        if (!deletedCrowdfund) {
            res.status(404).json({ message: 'Crowdfund not found' });
            return;
        }
        res.status(200).json({ message: 'Crowdfund deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
