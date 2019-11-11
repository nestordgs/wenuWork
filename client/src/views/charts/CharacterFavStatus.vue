<template>
  <div>
    <b-row>
      <b-col>
        <p>Favorites By Status</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="5" class="mx-auto">
        <ve-histogram loading :data="datacollection"></ve-histogram>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../../services/Api';

export default {
  name: 'ChartsFavStatus',
  data() {
    return {
      nCharacters: 493,
      datacollection: null,
      chartData: {
        columns: ['status', 'alive', 'dead', 'number'],
        rows: [
          { status: 'alive', alive: 3 },
          { status: 'dead', dead: 1 },
          { status: 'Unknown', number: 1 },
        ],
      },
    };
  },
  components: {
  },
  methods: {
    async fillData() {
      try {
        const response = await Api.get(`charts/favs/${this.$store.getters.getUserId}/status`, 'listChart');
        this.datacollection = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style>
</style>
