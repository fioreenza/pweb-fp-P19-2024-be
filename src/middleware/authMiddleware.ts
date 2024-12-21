import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware untuk verifikasi token
export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Mengambil token dari header Authorization

  // Jika token tidak ada
  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Token not found",
      data: {},
    });
    return;
  }

  // Verifikasi token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            res.status(401).json({
              status: "error",
              message: "Failed to authenticate token",
              data: {},
            });
            return;
          }
    
    // Jika token valid, simpan informasi pengguna ke dalam request untuk digunakan di route selanjutnya
    req.body.userId = (decoded as any).userId; // Menyimpan userId dari token ke dalam request
    next(); // Lanjut ke middleware berikutnya
  });
};