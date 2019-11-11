<template>
  <div>
    <b-row>
      <b-col>
        <p>Favorites By Status</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="5" class="mx-auto">
        <ve-line loading :data="datacollection"></ve-line>
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
