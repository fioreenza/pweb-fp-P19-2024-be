import Donation from '../models/Donation';

export const createDonationService = async (data: {user_id: string, crowdfund_id: string, payment_method: string, amount: number, bank_name?: string }) => {
  try {
    const newDonation = new Donation(data);
    await newDonation.save();
    return { success: true, message: 'Donation successfully created', data: newDonation };
  } catch (error) {
    throw new Error('Failed to create donation');
  }
};

// get donation by donation id
export const getDonationByIdService = async (id: string) => {
  try {
    const donation = await Donation.findById(id).populate('crowdfund_id').populate('user_id');
    if (!donation) {
      throw new Error('Donation not found');
    }
    return { success: true, data: donation };
  } catch (error) {
    throw new Error('Failed to fetch donation');
  }
}

export const getDonationByUserIdService = async (userId: string) => {
  try {
    const donations = await Donation.find({ user_id: userId }).populate('crowdfund_id').populate('user_id');
    if (!donations || donations.length === 0) {
      throw new Error('No donations found for this user');
    }
    return { success: true, data: donations };
  } catch (error) {
    console.error('Error fetching donations:', error); // Log the error
    throw new Error('Failed to fetch donations');
  }
};