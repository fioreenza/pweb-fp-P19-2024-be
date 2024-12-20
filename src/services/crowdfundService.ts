import Crowdfund, { CrowdfundStatus } from '../models/Crowdfund';

interface CreateCrowdfundInput {
  name: string;
  target: number;
}

export const getAllCrowdfundsService = async () => {
  try {
    const crowdfunds = await Crowdfund.find({ status: CrowdfundStatus.OPEN });
    return { success: true, data: crowdfunds };
  } catch (error) {
    throw new Error('Failed to fetch crowdfunds');
  }
};


export const createCrowdfundService = async (data: CreateCrowdfundInput) => {
  try {
    const newCrowdfund = new Crowdfund({
      name: data.name,
      target: data.target,
      current_donation: 0,
      status: CrowdfundStatus.OPEN,
    });

    const savedCrowdfund = await newCrowdfund.save();

    return { success: true, data: savedCrowdfund };
  } catch (error) {
    throw new Error('Failed to create crowdfund');
  }
};

export const getCrowdfundByIDService = async (id: string) => {
  try {
    const crowdfund = await Crowdfund.findById(id);
    if (!crowdfund) {
      throw new Error('Crowdfund not found');
    }

    return { success: true, data: crowdfund };
  } catch (error) {
    throw new Error('Failed to fetch crowdfund');
  }
}