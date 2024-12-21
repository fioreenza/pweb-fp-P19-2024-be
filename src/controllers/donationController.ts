import { Request, Response } from 'express';
import { createDonationService } from '../services/serviceDonation';
import { getDonationByIdService } from '../services/serviceDonation';
import { getDonationByUserIdService } from '../services/serviceDonation';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { payment_method, amount, bank_name, user_id, crowdfund_id } = req.body;

    // Validasi input
    if (!payment_method || !['QRIS', 'BANK_TRANSFER'].includes(payment_method)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }


    const donationData = { user_id, payment_method, amount, bank_name, crowdfund_id };
    const result = await createDonationService(donationData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

// get donation by id donation
export const getDonationByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getDonationByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

// get donation by user id
export const getDonationByUserID = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const result = await getDonationByUserIdService(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};

