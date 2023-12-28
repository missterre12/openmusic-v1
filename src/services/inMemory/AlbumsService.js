const { nanoid } = require('nanoid');

class AlbumsService {
  constructor() {
    this._albums = [];
  }

  addAlbum({ name, year }) {
    const id = nanoid(16);
    const newAlbum = { id, name, year };
    this._albums.push(newAlbum);
    return id;
  }

  getAlbumById(albumId) {
    return this._albums.find((album) => album.id === albumId);
  }

  updateAlbumById(albumId, { name, year }) {
    const index = this._albums.findIndex((album) => album.id === albumId);
    if (index !== -1) {
      this._albums[index] = { ...this._albums[index], name, year };
    }
  }

  deleteAlbumById(albumId) {
    this._albums = this._albums.filter((album) => album.id !== albumId);
  }
}

module.exports = AlbumsService;