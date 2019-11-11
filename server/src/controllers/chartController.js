import favoritesModel from '../models/favorites';
// import { getCharacter } from 'rickmortyapi';
import lodash from 'lodash';

class ChartController {

  async getFavoritesBystatus(req, res) {
    try {
      const { idUser } = req.params;
      const favorites = await favoritesModel.find({
        idUser,
      });
      const allCharacters = []
      favorites.forEach(character => {
        const string = JSON.stringify(character.dataCharacter);
        allCharacters.push(JSON.parse(string));
      })
      const favoritesBystatus = lodash.groupBy(allCharacters, 'status');
      const columns = Object.keys(favoritesBystatus);
      const rows = []
      columns.forEach((k) => {
        const status = k.charAt(0).toUpperCase() + k.slice(1);
        rows.push({
          status,
          characters: favoritesBystatus[k].length,
        })
      });
      const dataChart = {
        columns: ['status', 'characters'],
        rows
      };
      return res.status(200).send(dataChart);
    } catch (err) {
      console.error('err =>', err);
      return res.status(400).json(err);
    }
  }
}

export default new ChartController();
