import store from '../store';

// eslint-disable-next-line padded-blocks
const RedirectIfAuthenticated = (router) => {

  /**
   * If the user is not authenticated redirect to login
   */
  router.beforeEach((to, _from, next) => {
    switch (to.name) {
      case 'login':
        return next();
      case 'characters.index':
        return next();
      case 'charts.status':
        return next();
      case 'charts.episodes':
        return next();
      case 'home':
        return next();
      default:
        break;
    }
    if (store.getters.isAuth) {
      return next();
    }
    return next('/login');
  });
};

export default RedirectIfAuthenticated;
