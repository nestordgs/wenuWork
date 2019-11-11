<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'home' }">wenuWork</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="(item, index) in items" :key="index">
            <template v-if="!('options' in item)">
                <b-link
                  :to="{ name: item.route }"
                  class="nav-link"
                  v-if="
                    !item.requiredLogin
                    || (item.requiredLogin && isAuth)
                  "
                >
                  {{ item.title }}
                </b-link>
            </template>
            <template v-else>
                <b-nav-item-dropdown :text="item.title">
                  <template
                    v-for="(dItem, index) in item.options"
                  >
                    <b-dropdown-item
                      v-if="
                        !dItem.requiredLogin
                        || (dItem.requiredLogin && isAuth)
                      "
                      :to="{ name: dItem.route }"
                      :key="index"
                    >
                      {{ dItem.title }}
                    </b-dropdown-item>
                  </template>
                </b-nav-item-dropdown>
            </template>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-link
              :to="{ name: 'login' }"
              class="nav-link"
              v-if="!isAuth"
            >
              Login
            </b-link>
          </b-nav-item>
          <b-nav-item-dropdown
            right
            v-if="isAuth"
          >
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ $store.getters.getName }}</em>
            </template>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'List Characters', route: 'characters.index', requiredLogin: false,
        },
        {
          title: 'My Favorites', route: 'characters.favorites', requiredLogin: true,
        },
        {
          title: 'Charts',
          options: [
            {
              title: 'Vs. Status', route: 'characters.favorites', requiredLogin: true,
            },
            {
              title: 'Vs. Episodes', route: 'characters.favorites', requiredLogin: true,
            },
            {
              title: 'Favorites by Status', route: 'charts.status', requiredLogin: true,
            },
            {
              title: 'Favorites by Episodes', route: 'charts.fav.episodes', requiredLogin: true,
            },
          ],
        },
      ],
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: 'login',
      });
    },
  },
};
</script>

<style>
</style>template
