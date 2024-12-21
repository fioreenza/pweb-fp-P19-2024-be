// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export class AuthService {
  // Method untuk pendaftaran pengguna
  async register(username: string, email: string, password: string, role: 'admin' | 'user' = 'user') {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return await newUser.save();
  }

  async login(username: string | undefined, email: string | undefined, password: string) {
    if (!username && !email) {
        throw new Error("Either username or email must be provided");
    }
    if (!password) {
        throw new Error("Password must be provided");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    if (username && username !== user.username) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  }

  // Method untuk mendapatkan data pengguna yang sedang login
  async me(token: string) {
    try {
      // Verifikasi token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

      // Cari pengguna berdasarkan ID yang ada di dalam token
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Kembalikan data pengguna
      return user;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
};
