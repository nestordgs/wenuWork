<template>
  <div>
    <b-row>
      <b-col>
        <p>List Of Characters</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <listCharactersFilter
          :filter="filter"
          class="mb-3"
          @filterData="filterData"
          @getFullData="getDataWithOutFilters"
        />
      </b-col>
    </b-row>
    <noRecords v-if="characters.length === 0"/>
    <b-row v-if="characters.length !== 0">
      <b-table
        responsive
        striped
        hover
        small
        head-variant="dark"
        :items="characters"
        :fields="fields"
      >
        <template v-slot:cell(status)="data">
          {{ data.item.status | capitalize }}
        </template>
        <template v-slot:cell(location)="data">
          {{ data.item.location.name | capitalize }}
        </template>
        <template v-slot:cell(actions)="data">
          <label :for="`start-favorite-${data.item.id}`" v-if="$store.getters.isAuth">
            <input type="checkbox" name="" :id="`start-favorite-${data.item.id}`" class="d-none">
            <font-awesome-icon icon="star" />
          </label>
          <span v-else>login to add favorites</span>
        </template>
      </b-table>
    </b-row>
    <b-row v-if="characters.length !== 0">
      <b-col>
        <b-pagination-nav
          align="center"
          :number-of-pages="pagination.pages"
          :link-gen="lingGen"
          use-router
          @change="filterData"
          size="sm"
        >
        </b-pagination-nav>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../services/Api';
import listCharactersFilter from '../components/filters/ListCharactersFilters.vue';
import noRecords from '../components/NoRecords.vue';

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
        { key: 'actions', label: ' ', class: 'text-right' },
      ],
      characters: [],
      pagination: {},
      filter: {
        name: '',
        status: '',
        gender: '',
      },
    };
  },
  computed: {},
  watch: {},
  components: {
    listCharactersFilter,
    noRecords,
  },
  methods: {
    lingGen: pageNumber => `/list/${pageNumber}`,
    async getCharacters() {
      try {
        const route = (this.$route.params.id)
          ? `https://rickandmortyapi.com/api/character/?page=${this.$route.params.id}`
          : 'https://rickandmortyapi.com/api/character/?';
        const response = await Api.getCharacters(route, 'listCharacters', this.filter);
        this.characters = response.data.results;
        this.pagination = response.data.info;
      } catch (err) {
        if (err.response.data.error === 'There is nothing here') {
          this.characters = [];
          this.pagination = {};
        }
      }
    },
    async filterData() {
      const queryObj = this.filter;
      Object.keys(queryObj).forEach((k) => {
        if (queryObj[k] === '') {
          delete queryObj[k];
        }
      });
      this.$router.push({
        query: queryObj,
      })
        .catch(l => l);
      this.getCharacters();
    },
    getDataWithOutFilters() {
      this.$router.push({
        name: 'characters.index',
      })
        .catch(l => l);
      this.getCharacters();
    },
  },
  mounted() {
    this.getCharacters();
  },
};
</script>
