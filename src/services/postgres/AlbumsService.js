const { Pool } = require('pg');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const query = {
      text: 'INSERT INTO albums(name, year) VALUES($1, $2) RETURNING id',
      values: [name, year],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id; // Perbaikan: result.rows[0].id
  }

  async getAlbumById(albumId) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);
    return result.rows[0]; 
  }

  async updateAlbumById(albumId, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3',
      values: [name, year, albumId],
    };

    await this._pool.query(query);
  }

  async deleteAlbumById(albumId) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1',
      values: [albumId],
    };

    await this._pool.query(query);
  }
}

module.exports = AlbumsService; 