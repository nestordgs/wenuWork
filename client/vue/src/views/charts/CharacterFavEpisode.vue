<template>
  <div>
    <b-row>
      <b-col>
        <p>Favorites By Episodes</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mx-auto">
        <ve-line loading :data="datacollection" :colors="colors"></ve-line>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../../services/Api';

export default {
  name: 'ChartsFavEpisodes',
  data() {
    return {
      nCharacters: 493,
      datacollection: null,
      chartData: {
        columns: ['status', 'favCharacters'],
        rows: [
          { status: 'S01E01', favCharacters: 42 },
          { status: 'S01E02', favCharacters: 24 },
          { status: 'S01E03', favCharacters: 1 },
        ],
      },
      episodesArrId: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31,
      ],
      allEpisodes: [],
      favoriteCharacters: [],
    };
  },
  components: {
  },
  methods: {
    async fillData() {
      try {
        const response = await Api.getCharactersMultiple(
          `https://rickandmortyapi.com/api/episode/${this.episodesArrId}`,
        );
        this.allEpisodes = response.data;
        const responseFavorites = await Api.get(
          `favorites/${this.$store.getters.getUserId}`,
          'listFavorites',
        );
        this.favoriteCharacters = responseFavorites.data;
        await this.prepareData();
      } catch (err) {
        console.log(err);
      }
    },
    prepareData() {
      const rows = this.allEpisodes.map((e) => {
        const favCharacters = this.favoriteCharacters
          .filter(ch => e.characters.includes(`https://rickandmortyapi.com/api/character/${ch.dataCharacter.id}`))
          .length;
        const obj = {
          status: e.episode,
          "Fav's Characters": favCharacters,
        };
        return obj;
      });
      this.datacollection = {
        columns: ['status', "Fav's Characters"],
        rows,
      };
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style>
</style>
