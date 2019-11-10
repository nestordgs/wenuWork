import express from 'express';
import favoriteController from '../../controllers/favoriteController';

const router = express.Router();

router.get('/', favoriteController.getFavorites);
router.get('/ids/:idUser', favoriteController.myfavoritesIds);
router.post('/', favoriteController.insertFavorite);
router.delete('/:idCharacter/:idUser', favoriteController.removeFavorite);

export default router;
