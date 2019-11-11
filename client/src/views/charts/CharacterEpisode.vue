<template>
  <div>
    <b-row>
      <b-col>
        <p>Favorites By Episodes</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="mx-auto">
        <ve-line :data="datacollection"></ve-line>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../../services/Api';

export default {
  name: 'ChartsEpisodes',
  data() {
    return {
      nCharacters: 493,
      datacollection: null,
      allEpisodes: [],
      allCharacters: [],
      episodesArrId: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31,
      ],
      charactersArrId: [],
    };
  },
  components: {
  },
  methods: {
    async fillData() {
      try {
        const totalCharacters = 493;
        for (let i = 1; i < totalCharacters; i += 1) {
          this.charactersArrId.push(i);
        }
        const responseCharacters = await Api.getCharactersMultiple(
          `https://rickandmortyapi.com/api/character/${this.charactersArrId}`,
        );
        this.allCharacters = responseCharacters.data;
        const responseEpisodes = await Api.getCharactersMultiple(
          `https://rickandmortyapi.com/api/episode/${this.charactersArrId}`,
        );
        this.allEpisodes = responseEpisodes.data;
        await this.prepareData();
      } catch (err) {
        console.log(err);
      }
    },
    prepareData() {
      const rows = this.allEpisodes.map((e) => {
        const characterByEpisode = this.allCharacters
          .filter(ch => e.characters.includes(`https://rickandmortyapi.com/api/character/${ch.id}`))
          .length;
        const obj = {
          status: e.episode,
          Characters: characterByEpisode,
        };
        return obj;
      });
      this.datacollection = {
        columns: ['status', 'Characters'],
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
