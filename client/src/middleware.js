import AuthMiddleware from './middleware/RedirectIfAuthenticated';

export default function middleware(router) {
  AuthMiddleware(router);
}
