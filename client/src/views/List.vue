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
            <b-btn
              variant="link"
              v-if="$store.getters.isAuth && myFavoritesIds.includes(data.item.id)"
              @click="removeFavorites(data)"
            >
              <font-awesome-icon
                icon="star"
                :class="{
                  'text-gold' : myFavoritesIds.includes(data.item.id),
                }"
              />
            </b-btn>
            <b-btn
              variant="link"
              v-if="$store.getters.isAuth && !myFavoritesIds.includes(data.item.id)"
              @click="addToFavorites(data)"
            >
              <font-awesome-icon
                icon="star"
                :class="{
                  'text-secondary': !myFavoritesIds.includes(data.item.id),
                }"
              />
            </b-btn>
          <b-btn
            variant="link"
            v-if="!$store.getters.isAuth"
            :to="{ name: 'login' }"
            size="sm"
            class="text-secondary opacity-3"
            title="Login to add favorites"
            :id="`favorite-${data.item.id}`"
          >
            <font-awesome-icon
              icon="star"
              :class="{
                'text-gold' : myFavoritesIds.includes(data.item.id),
              }"
            />
          </b-btn>
          <b-tooltip
            :target="`favorite-${data.item.id}`"
            triggers="hover"
            placement="left"
          >
            Login to add favorites
          </b-tooltip>
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
        { sortable: true, variant: 'text-left', key: 'name' },
        { sortable: true, variant: 'text-left', key: 'gender' },
        { sortable: true, variant: 'text-left', key: 'species' },
        { sortable: true, variant: 'text-left', key: 'status' },
        { sortable: true, variant: 'text-left', key: 'location' },
        { key: 'actions', label: ' ', class: 'text-right' },
      ],
      myFavoritesIds: [],
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
    async getMyFavoritesIds() {
      try {
        if (this.$store.getters.isAuth) {
          const response = await Api.get(`favorites/ids/${this.$store.getters.getUserId}`, 'listFavoritesIds');
          this.myFavoritesIds = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addToFavorites(character) {
      try {
        const characterFavorite = {
          idUser: this.$store.getters.getUserId,
          idCharacter: character.item.id,
          dataCharacter: character.item,
        };
        await Api.post('/favorites', characterFavorite, 'addToFavorites');
        this.$snotify.success(`${character.item.name} added successfully to favorites`, 'Success');
        await this.getMyFavoritesIds();
      } catch (err) {
        console.log(err);
      }
    },
    async removeFavorites(character) {
      try {
        await Api.delete(`/favorites/${character.item.id}/${this.$store.getters.getUserId}`, 'removeFavorites');
        this.$snotify.success(`${character.item.name} removed successfully to favorites`, 'Success');
        await this.getMyFavoritesIds();
      } catch (err) {
        console.log(err);
      }
      // 'data.item.id'
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
  async mounted() {
    await this.getMyFavoritesIds();
    await this.getCharacters();
  },
};
</script>
