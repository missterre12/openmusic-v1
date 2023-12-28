const AlbumsHandler = require('./handler');
const routes = require('./routes');

const albumsPlugin = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumsService, validator }) => {
    const handler = new AlbumsHandler(albumsService, validator);
    server.route(routes(handler));
  },
};

module.exports = albumsPlugin;
