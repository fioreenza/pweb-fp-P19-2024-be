import Donation from '../models/Donation';
import Crowdfund from '../models/Crowdfund';

export const createDonationService = async (data: { user_id: string, crowdfund_id: string, payment_method: string, amount: number, bank_name?: string }) => {
  const session = await Crowdfund.startSession();
  session.startTransaction();

  try {
    // Create the donation
    const newDonation = new Donation(data);
    await newDonation.save();

    // Find the crowdfund and update its current_donation
    const crowdfund = await Crowdfund.findById(data.crowdfund_id).session(session);
    if (!crowdfund) {
      throw new Error('Crowdfund not found');
    }

    // Update current_donation by adding the donation amount
    crowdfund.current_donation += data.amount;
    await crowdfund.save();

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Donation successfully created', data: newDonation };
  } catch (error) {
    // If any error happens, abort the transaction
    await session.abortTransaction();
    session.endSession();
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