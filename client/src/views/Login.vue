<template>
  <div>
    <b-row>
      <b-col cols="10" sm="10" md="7" class="mx-auto">
        <b-card title="Sign In">
          <div>
            <b-form @submit.prevent="onSubmit">
              <b-form-group label="Email Address:">
                <b-input
                  id="email"
                  name="email"
                  type="email"
                  size="sm"
                  v-model.trim="user.email"
                  required
                  placeholder="Enter your email"
                />
              </b-form-group>
              <b-form-group label="Password:">
                <b-input
                  id="password"
                  name="password"
                  type="password"
                  size="sm"
                  v-model.trim="user.password"
                  required
                  placeholder="Enter your password"
                />
              </b-form-group>
              <p class="text-center">
                <b-button type="submit" size="sm" variant="primary">Login</b-button>
              </p>
            </b-form>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from '../services/Api';

export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: 'nesor2@gmail.com',
        password: '132456',
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const response = await Api.login({
          email: this.user.email,
          password: this.user.password,
        });

        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({ name: 'home' });
        this.$snotify.success(`Welcome ${response.data.user.name}`, 'Success');
      } catch (err) {
        console.error('err =>', err);
      }
    },
  },
};
</script>

<style>

</style>
