const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'INSERT INTO songs(title, year, genre, performer, duration, album_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getSongs() {
    const query = 'SELECT * FROM songs';
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getSongById(songId) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateSongById(songId, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7',
      values: [title, year, genre, performer, duration, albumId, songId],
    };
  
    await this._pool.query(query);
  }

  async deleteSongById(songId) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1',
      values: [songId],
    };

    await this._pool.query(query);
  }
}

module.exports = SongsService;