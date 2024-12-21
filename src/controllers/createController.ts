export const createCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, targetDonation, createdBy } = req.body;

        // Validasi data jika diperlukan
        if (!name || !targetDonation || !createdBy) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const newCrowdfund = new Crowdfund({
            name,
            targetDonation,
            currentDonation: 0,
            status: 'open', // Default status
            createdBy,
        });

        await newCrowdfund.save();
        res.status(201).json(newCrowdfund);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
