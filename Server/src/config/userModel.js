import { query } from './db.js';

class User {
  static async create(username, email, passwordHash) {
    const res = await query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, passwordHash]
    );
    return res.rows[0];
  }

  static async findByUsername(username) {
    const res = await query(
      'SELECT * FROM users WHERE username = $1',
      [username.toLowerCase()]
    );
    return res.rows[0];
  }

  static async findByEmail(email) {
    const res = await query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    return res.rows[0];
  }

  static async findById(id) {
    const res = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return res.rows[0];
  }
}

export default User;