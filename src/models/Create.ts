import Crowdfund from '../models/Crowdfund';

const createCrowdfund = async () => {
    const newCrowdfund = new Crowdfund({
        name: 'Help Build a School',
        targetDonation: 10000,
        createdBy: 'Admin',
    });

    await newCrowdfund.save();
    console.log('New Crowdfund Created:', newCrowdfund);
};
