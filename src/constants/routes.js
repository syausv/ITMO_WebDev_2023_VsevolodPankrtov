const ROUTES = {
  INDEX: '/',
  POSTCARDS: '/postcards',
  POSTCARD_ID: '/postcards/:id',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
};

const PUBLIC_PAGES = [
  ROUTES.INDEX,
  ROUTES.SIGNIN,
  ROUTES.SIGNUP
];
export { PUBLIC_PAGES };
export default ROUTES;