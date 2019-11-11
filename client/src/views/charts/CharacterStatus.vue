<template>
  <div>
    <b-row>
      <b-col>
        <p>Characters By Status</p>
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
import { groupBy } from 'lodash';
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
      charactersByStatus: null,
    };
  },
  components: {
  },
  methods: {
    async fillData() {
      try {
        const totalCharacters = 494;
        for (let i = 1; i < totalCharacters; i += 1) {
          this.charactersArrId.push(i);
        }
        const responseCharacters = await Api.getCharactersMultiple(
          `https://rickandmortyapi.com/api/character/${this.charactersArrId}`,
        );
        this.allCharacters = responseCharacters.data;
        await this.prepareData();
      } catch (err) {
        console.log(err);
      }
    },
    prepareData() {
      this.charactersByStatus = groupBy(this.allCharacters, 'status');
      const columns = Object.keys(this.charactersByStatus);
      const rows = columns.map((k) => {
        const status = k.charAt(0).toUpperCase() + k.slice(1);
        const obj = {
          status,
          Characters: this.charactersByStatus[k].length,
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
