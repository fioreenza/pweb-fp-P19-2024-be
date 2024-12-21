import { Router } from 'express';
import { createFeedback, getFeedbacks } from './feedbackController';

const router = Router();

router.post('/feedback', createFeedback);
router.get('/feedback', getFeedbacks);

export default router;
