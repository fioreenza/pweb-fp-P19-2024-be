import express from 'express';
import { getAllCrowdfunds, createCrowdfund, getCrowdfundByID } from '../controllers/crowdfundController';
import { createDonation, getDonationByID, getDonationByUserID } from '../controllers/donationController';
import { createComment } from '../controllers/commentController';
import { addcreateFavorite, removeFavorite } from '../controllers/favoriteController';
import { getFavoriteCrowdfunds } from '../controllers/favoriteController';
import { getCommentByCrowdfundId } from '../controllers/commentController';

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
router.post('/:id/donate', (req, res) => {
    createDonation(req, res);
}
);
router.post('/:id/comment', (req, res) => {
    createComment(req, res);
}
);
router.post('/:id/favorite', (req, res) => {
    addcreateFavorite(req, res);
}
);
router.get('/favorite/:user_id', (req, res) => {
    getFavoriteCrowdfunds(req, res);
}
);
router.get('/donate/:id', (req, res) => {
    getDonationByID(req, res);
}
);
router.get('/donate/user/:user_id', (req, res) => {
    getDonationByUserID(req, res);
}
);
router.delete('/:id/favorite', (req, res) => {
    removeFavorite(req, res);
}
);
router.get('/comment/:crowdfund_id', (req, res) => {
    getCommentByCrowdfundId(req, res);
}
);
export default router;