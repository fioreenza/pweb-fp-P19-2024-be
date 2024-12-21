import express from 'express';
import {
    getAllCrowdfunds,
    getCrowdfund,
    createCrowdfund,
    updateCrowdfund,
    deleteCrowdfund,
} from '../controllers/crowdfundController';

const router = express.Router();

router.get('/', getAllCrowdfunds);
router.get('/:id', getCrowdfund);
router.post('/create', createCrowdfund);
router.put('/:id/edit', updateCrowdfund);
router.delete('/:id', deleteCrowdfund);

export default router;
