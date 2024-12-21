const express = require('express');
const router = express.Router();
const crowdfundController = require('../controllers/crowdfundController');

// Route untuk Admin Landing Page (Melihat semua Crowdfund)
router.get('/', crowdfundController.getCrowdfunds);

// Route untuk melihat Detail Crowdfund
router.get('/:id', crowdfundController.getCrowdfundById);

// Route untuk Edit Crowdfund
router.put('/:id/edit', crowdfundController.updateCrowdfund);

// Route untuk membuat Crowdfund baru
router.post('/create', crowdfundController.createCrowdfund);

// Route untuk menghapus Crowdfund
router.delete('/:id', crowdfundController.deleteCrowdfund);

// Route untuk menambahkan komentar pada crowdfund
router.post('/:id/comments', crowdfundController.addComment);

// Route untuk menghapus komentar pada crowdfund
router.delete('/:id/comments/:commentId', crowdfundController.deleteComment);

module.exports = router;
