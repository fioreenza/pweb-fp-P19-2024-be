import express from 'express';
import { getAllCrowdfunds, createCrowdfund, getCrowdfundByID } from '../controllers/crowdfundController';
import { createDonation } from '../controllers/donationController';
import { createComment } from '../controllers/commentController';
import { addFavoriteCrowdfund } from '../controllers/favoriteController';
import { getFavoriteCrowdfunds, getAllFavorites } from '../controllers/favoriteController';

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
    addFavoriteCrowdfund(req, res);
}
);
router.get('/favorite/:user_id', (req, res) => {
    getFavoriteCrowdfunds(req, res);
}
);
router.get('/favorite', (req, res) => {
    getAllFavorites(req, res);
}
);

export default router;