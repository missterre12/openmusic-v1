const { nanoid } = require('nanoid');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const newSong = { id, title, year, genre, performer, duration, albumId };
    this._songs.push(newSong);
    return id;
  }

  getSongs() {
    return this._songs;
  }

  getSongById(songId) {
    return this._songs.find((song) => song.id === songId);
  }

  updateSongById(songId, { title, year, genre, performer, duration, albumId }) {
    const index = this._songs.findIndex((song) => song.id === songId);
    if (index !== -1) {
      this._songs[index] = { ...this._songs[index], title, year, genre, performer, duration, albumId };
    }
  }

  deleteSongById(songId) {
    this._songs = this._songs.filter((song) => song.id !== songId);
  }
}

module.exports = SongsService;