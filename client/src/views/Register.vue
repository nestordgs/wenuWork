<template>
  <div>
    <b-row>
      <b-col cols="10" sm="10" md="7" class="mx-auto">
        <b-card title="Sign In">
          <div>
            <b-form @submit.prevent="onSubmit">
              <b-form-group label="Name:" label-align="left">
                <b-input
                  id="name"
                  name="name"
                  type="text"
                  size="sm"
                  v-model.trim="user.name"
                  required
                  placeholder="Enter your name"
                />
              </b-form-group>
              <b-form-group label="Email Address:" label-align="left">
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
              <b-form-group label="Password:" label-align="left">
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
              <b-form-group label="Confirm Password:" label-align="left">
                <b-input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  size="sm"
                  v-model.trim="user.confirmPassword"
                  required
                  placeholder="Confirm your password"
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        await Api.register({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
        }, 'loginRequest');

        this.$router.push({ name: 'login' });
        this.$snotify.success('Sign In successfully, please login to add favorites.', 'Success');
      } catch (err) {
        this.$snotify.error(err.response.data.message, 'Error');
        console.error('err =>', err);
      }
    },
  },
};
</script>

<style>

</style>
