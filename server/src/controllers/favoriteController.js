import favoriteModel from '../models/favorites';

class FavoriteController {
  async getFavorites(req, res) {
    try {
      const { idUser } = req.body;
      const favorites = await favoriteModel.find({idUser});
      return res.status(200).send(favorites);
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  }

  async insertFavorite(req, res) {
    try {
      const { idUser, idCharacter, dataCharacter } = req.body;
      const myfavorites = await favoriteModel.find({idUser})
      const myfavoritesIds = myfavorites
        .map(i => i.idCharacter);
      if (myfavoritesIds.includes(idCharacter)) {
        return res.status(403).send({
          message: `Can't duplicate a favorite character, please remove it first`,
        });
      }
      const newFavorite = new favoriteModel({
        idUser,
        idCharacter,
        dataCharacter,
      });
      await newFavorite.save();
      return res.status(200).send({
        message: `Characted saved as favorite successfully.`,
      });
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  }

  async removeFavorite(req, res) {
    try {
      const { idUser, idCharacter } = req.params;
      const curFavorite = await favoriteModel.find({
        idUser,
        idCharacter,
      });

      if (!curFavorite.length) {
        return res.status(404).send({
          message: 'This Favorite character does not exists.',
        });
      }
      await favoriteModel.deleteOne({ _id: curFavorite[0]._id });
      return res.status(200).send({
        message: 'Character remove from favorite successfully.',
      });
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  }

  async myfavoritesIds(req, res) {
    try {
      const { idUser } = req.params;
      const favorites = await favoriteModel.find({
        idUser,
      });

      const favoritesIds = favorites.map(i => i.idCharacter);
      return res.status(200).send(favoritesIds);
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  }
};

export default new FavoriteController();
