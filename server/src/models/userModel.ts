import { db } from '../db/database.js';
import bcrypt from 'bcryptjs';
import type { User } from 'shared';

interface UserRow {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export const UserModel = {
  create(username: string, password: string): User {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const result = stmt.run(username, hashedPassword);

    return {
      id: result.lastInsertRowid as number,
      username,
      createdAt: new Date().toISOString()
    };
  },

  findByUsername(username: string): (UserRow & User) | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const row = stmt.get(username) as UserRow | undefined;

    if (!row) return undefined;

    return {
      ...row,
      id: row.id,
      username: row.username,
      createdAt: row.created_at
    };
  },

  findById(id: number): User | undefined {
    const stmt = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?');
    const row = stmt.get(id) as UserRow | undefined;

    if (!row) return undefined;

    return {
      id: row.id,
      username: row.username,
      createdAt: row.created_at
    };
  },

  verifyPassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
};
