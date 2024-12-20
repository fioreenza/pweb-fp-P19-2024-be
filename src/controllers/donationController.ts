import { Request, Response } from 'express';
import { createDonationService } from '../services/serviceDonation';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { payment_method, amount, bank_name } = req.body;

    // Validasi input
    if (!payment_method || !['QRIS', 'BANK_TRANSFER'].includes(payment_method)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method' });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }

    const donationData = { payment_method, amount, bank_name };
    const result = await createDonationService(donationData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: (error as any).message });
  }
};
