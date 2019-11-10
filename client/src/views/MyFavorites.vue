<template>
  <div>
    <b-row>
      <b-col>
        <p>
          <span class="font-weight-bold">{{ $store.getters.getName }}</span> Favorites List</p>
      </b-col>
    </b-row>
    <noRecords v-if="favorites.length === 0" />
    <b-row v-if="favorites.length > 0">
      <b-table
        responsive
        striped
        hover
        small
        head-variant="dark"
        :items="favorites"
        :fields="fields"
      >
        <template v-slot:cell(dataCharacter.location)="data">
            {{ data.item.dataCharacter.location.name }}
        </template>
      </b-table>
    </b-row>
  </div>
</template>

<script>
import noRecords from '../components/NoRecords.vue';
import Api from '../services/Api';

export default {
  data() {
    return {
      fields: [
        {
          sortable: true, variant: 'text-left', key: 'dataCharacter.name', label: 'Name',
        },
        {
          sortable: true, variant: 'text-left', key: 'dataCharacter.gender', label: 'Gender',
        },
        {
          sortable: true, variant: 'text-left', key: 'dataCharacter.species', label: 'Species',
        },
        {
          sortable: true, variant: 'text-left', key: 'dataCharacter.status', label: 'Status',
        },
        {
          sortable: true, variant: 'text-left', key: 'dataCharacter.location', label: 'Location',
        },
      ],
      favorites: [],
    };
  },
  components: {
    noRecords,
  },
  methods: {
    async getFavorites() {
      try {
        // const
        const response = await Api.get(`favorites/${this.$store.getters.getUserId}`, 'listFavorites');
        this.favorites = response.data;
        console.log('response =>', response);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getFavorites();
  },
};
</script>

<style>

</style>
