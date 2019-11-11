import express from 'express';
import chartController from '../../controllers/chartController';
import isAuthMiddleware from '../../middleware/isAuth';

const router = express.Router();

router.get('/favs/:idUser/status', isAuthMiddleware, chartController.getFavoritesByStatus);

export default router;
