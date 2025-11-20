import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import type { UserLogin, AuthResponse } from 'shared';

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body as UserLogin;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = UserModel.findByUsername(username);

      if (!user || !UserModel.verifyPassword(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      const response: AuthResponse = {
        token,
        user: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body as UserLogin;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }

      const existingUser = UserModel.findByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      const user = UserModel.create(username, password);

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      const response: AuthResponse = {
        token,
        user
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
