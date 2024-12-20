import express from 'express';
import { getAllCrowdfunds, createCrowdfund, getCrowdfundByID } from '../controllers/crowdfundController';

const router = express.Router();

router.get('/', (req, res) => {
    getAllCrowdfunds(req, res);
}
);
router.post('/', (req, res) => {
    createCrowdfund(req, res);
}
);
router.get('/:id', (req, res) => {
    getCrowdfundByID(req, res);
}
);

export default router;