import { Router } from 'express';
import { register, login, me } from '../controllers/authController';

const router = Router();

router.post('/register', (req, res, next) => {
    register(req, res, next);
});

router.post('/login', (req, res, next) => {
    login(req, res, next);
});

router.get('/me', (req, res, next) => {
   me(req, res, next);
});
export default router;