import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Register.vue'),
  },
  {
    path: '/list/:id?',
    name: 'characters.index',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
  },
  {
    path: '/favorites/:id?',
    name: 'characters.favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/MyFavorites.vue'),
  },
  {
    path: '/charts/status/',
    name: 'charts.status',
    component: () => import(/* webpackChunkName: "chartStatus" */ '../views/charts/CharacterStatus.vue'),
  },
  {
    path: '/charts/episode/',
    name: 'charts.episodes',
    component: () => import(/* webpackChunkName: "chartEpisodes" */ '../views/charts/CharacterEpisode.vue'),
  },
  {
    path: '/charts/fav/status/',
    name: 'charts.fav.status',
    component: () => import(/* webpackChunkName: "chartFavoritesStatus" */ '../views/charts/CharacterFavStatus.vue'),
  },
  {
    path: '/charts/fav/episode/',
    name: 'charts.fav.episodes',
    component: () => import(/* webpackChunkName: "chartFavoritesEpisodes" */ '../views/charts/CharacterFavEpisode.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
