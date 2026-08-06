import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'electro_fennassa_jwt_secret_2026_taourirt';
// Default bcrypt hash for "Nour@1969"
const ADMIN_EMAIL = 'Electro_Fennassa@proton.me';
const ADMIN_PASSWORD_PLAIN = 'Nour@1969';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function generateToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
  } catch (err) {
    return null;
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé: Token manquant.' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Token invalide ou expiré.' });
  }

  req.user = decoded;
  next();
}

export function adminOnlyMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  authMiddleware(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Accès refusé. Privilèges Administrateur requis.' });
    }
    next();
  });
}

export function validateAdminCredentials(email: string, pass: string): boolean {
  if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD_PLAIN) {
    return true;
  }
  return false;
}
