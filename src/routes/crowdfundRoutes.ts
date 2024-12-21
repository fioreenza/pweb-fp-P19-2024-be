import express from 'express';
import {
    getAllCrowdfunds,
    getCrowdfund,
    createCrowdfund,
    updateCrowdfund,
    deleteCrowdfund,
} from '../controllers/crowdfundController';

const router = express.Router();

router.get('/', getAllCrowdfunds); // Fetch all crowdfunds
router.get('/:id', getCrowdfund); // Fetch specific crowdfund details
router.post('/create', createCrowdfund); // Create new crowdfund
router.put('/:id/edit', updateCrowdfund); // Update existing crowdfund
router.delete('/:id', deleteCrowdfund); // Delete crowdfund

export default router;
