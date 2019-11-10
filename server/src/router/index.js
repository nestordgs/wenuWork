import express from 'express';
import authController from '../controllers/authController';
import favoriteRouter from './favorites';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to WenuWork test API',
}));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.use('/favorites', favoriteRouter);

export default router;
