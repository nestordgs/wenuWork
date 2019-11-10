<template>
  <div>
    <b-row>
      <b-col>
        <p>List Of Characters</p>
      </b-col>
    </b-row>
    <b-row v-if="characters.length !== 0">
      <b-table
        responsive
        striped
        hover
        small
        :items="characters"
        :fields="fields"
      >
        <template v-slot:cell(status)="data">
          {{ data.item.status | capitalize }}
        </template>
        <template v-slot:cell(location)="data">
          {{ data.item.location.name | capitalize }}
        </template>
      </b-table>
    </b-row>
    <b-row >
      <b-col>
        <b-pagination-nav
          align="center"
          :number-of-pages="pagination.pages"
          :link-gen="lingGen"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../services/Api';

export default {
  name: 'listCharacters',
  data() {
    return {
      fields: [
        { sortable: true, key: 'name' },
        { sortable: true, key: 'gender' },
        { sortable: true, key: 'species' },
        { sortable: true, key: 'status' },
        { sortable: true, key: 'location' },
      ],
      characters: [],
      pagination: {},
    };
  },
  methods: {
    lingGen: pageNumber => `/list/${pageNumber}`,
    async getCharacters() {
      const route = (this.$route.params.id)
        ? `https://rickandmortyapi.com/api/character/?page=${this.$route.params.id}`
        : 'https://rickandmortyapi.com/api/character/?';
      const response = await Api.getCharacters(route, 'listCharacters');
      this.characters = response.data.results;
      this.pagination = response.data.info;
    },
  },
  mounted() {
    this.getCharacters();
  },
};
</script>
