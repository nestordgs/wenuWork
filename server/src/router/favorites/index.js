import express from 'express';
import favoriteController from '../../controllers/favoriteController';
import isAuthMiddleware from '../../middleware/isAuth';

const router = express.Router();

router.get('/:idUser', isAuthMiddleware, favoriteController.getFavorites);
router.get('/ids/:idUser', isAuthMiddleware, favoriteController.myfavoritesIds);
router.post('/', isAuthMiddleware, favoriteController.insertFavorite);
router.delete('/:idCharacter/:idUser', isAuthMiddleware, favoriteController.removeFavorite);

export default router;
