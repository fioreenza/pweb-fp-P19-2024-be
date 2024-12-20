import Donation from '../models/Donation';

export const createDonationService = async (data: { payment_method: string, amount: number, bank_name?: string }) => {
  try {
    const newDonation = new Donation(data);
    await newDonation.save();
    return { success: true, message: 'Donation successfully created', data: newDonation };
  } catch (error) {
    throw new Error('Failed to create donation');
  }
};
