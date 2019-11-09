<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'home' }">wenuWork</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="(item, index) in items" :key="index">
            <b-link
              :to="{ name: item.route }"
              class="nav-link"
              v-if="!item.requiredLogin || (item.requiredLogin && isAuth)"
            >
              {{ item.title }}
            </b-link>
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
          title: 'Favorites Characters', route: 'characters.index', requiredLogin: true,
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
