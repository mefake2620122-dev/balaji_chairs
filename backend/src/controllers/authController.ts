import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const getSecret = () => process.env.SESSION_SECRET || 'balaji_unnao_secure_admin_secret_2026_x89f';
const getAdminPin = () => process.env.ADMIN_PIN || '7880';

// Helper to create HMAC signature
const generateToken = (): { token: string; expiresAt: number } => {
  const secret = getSecret();
  const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8 hours validity
  const payload = `${expiresAt}:balaji_admin_session`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
  return { token, expiresAt };
};

// Helper to verify HMAC signature
export const verifyTokenString = (tokenString: string): boolean => {
  try {
    const decoded = Buffer.from(tokenString, 'base64url').toString('utf8');
    const [expiresAtStr, role, signature] = decoded.split(':');
    if (!expiresAtStr || !role || !signature) return false;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const secret = getSecret();
    const expectedPayload = `${expiresAtStr}:${role}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(expectedPayload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
};

// POST /api/admin/auth/login
export const login = (req: Request, res: Response): void => {
  const { pin } = req.body;

  if (!pin || typeof pin !== 'string') {
    res.status(400).json({ success: false, message: 'PIN is required.' });
    return;
  }

  const expectedPin = getAdminPin().trim();
  const providedPin = pin.trim();

  // Safe timing comparison if equal length
  let isValid = false;
  if (providedPin.length === expectedPin.length) {
    isValid = crypto.timingSafeEqual(Buffer.from(providedPin), Buffer.from(expectedPin));
  }

  if (!isValid) {
    res.status(401).json({
      success: false,
      message: 'Invalid Admin Security PIN. Access denied.'
    });
    return;
  }

  const { token, expiresAt } = generateToken();
  res.json({
    success: true,
    message: 'Admin authentication successful.',
    token,
    expiresAt
  });
};

// GET /api/admin/auth/verify
export const verify = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Missing authorization token.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!verifyTokenString(token)) {
    res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
    return;
  }

  res.json({
    success: true,
    message: 'Session valid.',
    role: 'Showroom Admin'
  });
};

// Middleware to protect sensitive administrative actions (e.g. DELETE / PUT status)
export const requireAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized. Staff token required.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!verifyTokenString(token)) {
    res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
    return;
  }

  next();
};
