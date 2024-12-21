export const updateCrowdfund = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, targetDonation, status } = req.body;

        // Validasi data jika diperlukan
        if (!name || !targetDonation || !status) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

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
