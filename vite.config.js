import mkcert from 'vite-plugin-mkcert';
import UnoCSS from 'unocss/vite';
export default {
  server: {
    port: 8888,
    host: 'local.dev',
    https: true,
  },
  plugins: [mkcert(), UnoCSS()],
};
