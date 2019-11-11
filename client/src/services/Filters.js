import Vue from 'vue';

// convert string into capitalize, this replace underscore by white space too
Vue.filter('capitalize', (value) => {
  if (!value) return '';
  // eslint-disable-next-line no-param-reassign
  const newValue = value.toString().replace('_', ' ');
  return newValue.charAt(0).toUpperCase() + newValue.slice(1);
});

export default Vue;
