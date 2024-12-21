import Crowdfund from '../models/Crowdfund';

const editCrowdfund = async (id: string) => {
    const updatedCrowdfund = await Crowdfund.findByIdAndUpdate(
        id,
        { name: 'Help Build a Hospital', targetDonation: 20000, status: 'close' },
        { new: true } // Return the updated document
    );

    if (!updatedCrowdfund) {
        console.log('Crowdfund not found!');
        return;
    }

    console.log('Crowdfund Updated:', updatedCrowdfund);
};
