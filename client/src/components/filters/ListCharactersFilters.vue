<template>
  <div>
    <p class="text-right">
      <b-btn
        type="button"
        size="sm"
        variant="outline-primary"
        v-b-toggle.collapse1
      >
        <font-awesome-icon icon="filter" /> Filters
        <span v-if="numFilters">({{ numFilters }})</span>
      </b-btn>
    </p>
    <b-collapse id="collapse1" class="show">
      <b-card>
        <h4 slot="header" class="card-text">Filters</h4>
        <b-form>
          <b-row>
            <b-col cols="12" md="6" class="text-left">
              <b-form-group label="Name">
                <b-input-group>
                  <b-input
                    size="sm"
                    id="nameFilter"
                    name="nameFilter"
                    v-model="filter.name"
                  />
                  <b-input-group-append>
                    <b-btn
                      size="sm"
                      @click="filter.name = ''"
                    >
                      Clear
                    </b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="6" class="text-left">
              <!-- <b-form-group label="Status"> -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <span
                    class="m-r-3 font-weight-bold"
                  >
                    Status
                  </span>
                  <b-btn
                    size="sm"
                    @click="filter.status = ''"
                  >
                    Clear Status filter
                  </b-btn>
                </div>
                <b-form-radio-group
                  id="radio-state-group"
                  name="radio-states"
                  v-model="filter.status"
                  :options="status"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group class="text-left">
                <div class="d-flex justify-content-between">
                  <span
                    class="m-r-3 font-weight-bold"
                  >
                    Gender
                  </span>
                  <b-btn
                    size="sm"
                    @click="filter.gender = ''"
                  >
                    Clear Gender filter
                  </b-btn>
                </div>
                <b-form-radio-group
                  id="radio-gender-group"
                  name="radio-gender"
                  v-model="filter.gender"
                  :options="genders"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <p class="text.right mt-3">
            <b-btn
              @click="clickBtn"
              variant="outline-primary"
              size="sm"
            >
              Apply Filters
            </b-btn>
          </p>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: [
        { text: 'Unknown', value: 'unknown' },
        { text: 'Alive', value: 'alive' },
        { text: 'Dead', value: 'dead' },
      ],
      genders: [
        { text: 'Female', value: 'female' },
        { text: 'Male', value: 'male' },
        { text: 'Unknown', value: 'unknown' },
        { text: 'Genderless', value: 'genderless' },
      ],
      selectedFilters: {},
    };
  },
  props: {
    filter: {
      type: Object,
      require: true,
    },
  },
  watch: {
    $router(to, from) {
      console.log(to, from);
    },
  },
  computed: {
    numFilters() {
      return Object.values(this.filter).filter(value => value && value.length)
        .length;
    },
  },
  methods: {
    clickBtn() {
      if (this.numFilters) {
        this.$emit('filterData', this.filter);
      } else {
        this.$emit('getFullData', this.filter);
      }
    },
  },
};
</script>

<style>

</style>
