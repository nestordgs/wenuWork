import express from 'express';
import chartController from '../../controllers/chartController';

const router = express.Router();

router.get('/favs/:idUser/status', chartController.getFavoritesByStatus);

export default router;
