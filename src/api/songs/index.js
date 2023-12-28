const SongsHandler = require('./handler');
const routes = require('./routes');

const songsPlugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { songsService, validator }) => {
    await server.register(require('hapi-auth-jwt2')); // Import modul hapi-auth-jwt2
    server.auth.strategy('openmusic_jwt', 'jwt', {
      keys: process.env.APP_KEY, // Ganti dengan kunci yang sesuai
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: 60 * 60 * 24 * 30, // 30 days
        algorithms: ['HS256'],
      },
      validate: async (artifacts, request, h) => ({
        isValid: true,
        credentials: artifacts.decoded.payload,
      }),
    });

    server.auth.default('openmusic_jwt'); // Menggunakan strategi autentikasi default

    const handler = new SongsHandler(songsService, validator);
    server.route(routes(handler));
  },
};

module.exports = songsPlugin;