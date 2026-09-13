import type { IncomingMessage, ServerResponse } from 'http';

export interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  cookies: Record<string, string>;
  body: any;
}

export interface VercelResponse extends ServerResponse {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
}
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Memory/tmp store for Vercel Serverless environment
const TMP_DIR = '/tmp';
const ENQUIRIES_FILE = path.join(TMP_DIR, 'enquiries.json');
const REPAIRS_FILE = path.join(TMP_DIR, 'repairs.json');

const INITIAL_ENQUIRIES = [
  {
    id: "ENQ-1789314898602-148",
    name: "Anand Sharma",
    phone: "7880353900",
    email: "anand.sharma@example.com",
    requirement: "Bulk Office Chairs (10 units)",
    product: "Aura Executive High-Back",
    message: "Requirement for chartered accountant office in Civil Lines, Unnao.",
    source: "website_modal",
    createdAt: "2026-09-13T15:54:58.602Z",
    status: "contacted"
  }
];

const INITIAL_REPAIRS = [
  {
    id: "REP-1789314910245-881",
    name: "Dr. R. K. Mishra",
    phone: "9839012345",
    chairType: "Executive Revolving Chair",
    issueType: "gas_lift_sinking",
    issueDescription: "Chair sinks automatically when sitting down. Needs class-4 hydraulic gas lift cylinder replacement.",
    address: "Mishra Dental Clinic, Station Road, Unnao",
    createdAt: "2026-09-13T15:55:10.245Z",
    status: "pending"
  }
];

const readStore = (file: string, fallback: any[]) => {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeStore = (file: string, data: any[]) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('Failed writing to store:', err);
  }
};

const getSecret = () => process.env.SESSION_SECRET || 'balaji_unnao_secure_admin_secret_2026_x89f';
const getAdminPin = () => process.env.ADMIN_PIN || '7880';

const generateToken = () => {
  const secret = getSecret();
  const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
  const payload = `${expiresAt}:balaji_admin_session`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
};

const verifyToken = (tokenString?: string): boolean => {
  if (!tokenString) return false;
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';
  const cleanUrl = url.split('?')[0];

  // 1. Health Check
  if (cleanUrl === '/api/health' || cleanUrl === '/api/health/') {
    return res.status(200).json({
      status: 'online',
      service: 'Balaji Chairs API (Vercel Serverless)',
      brand: 'BALAJI CHAIRS™ INNOVATIVE CREATIONS',
      location: 'Unnao, UP, India',
      timestamp: new Date().toISOString()
    });
  }

  // 2. Admin Auth: Login
  if (cleanUrl === '/api/admin/auth/login' && req.method === 'POST') {
    const { pin } = req.body || {};
    const expectedPin = getAdminPin().trim();
    const providedPin = String(pin || '').trim();

    let isValid = false;
    if (providedPin.length === expectedPin.length) {
      isValid = crypto.timingSafeEqual(Buffer.from(providedPin), Buffer.from(expectedPin));
    }

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin Security PIN. Access denied.'
      });
    }

    const token = generateToken();
    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token
    });
  }

  // 3. Admin Auth: Verify
  if (cleanUrl === '/api/admin/auth/verify' && req.method === 'GET') {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
    if (!verifyToken(token)) {
      return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
    }
    return res.status(200).json({ success: true, role: 'Showroom Admin' });
  }

  // 4. Enquiries API
  if (cleanUrl.startsWith('/api/enquiries')) {
    const enquiries = readStore(ENQUIRIES_FILE, INITIAL_ENQUIRIES);

    if (req.method === 'GET') {
      return res.status(200).json({ success: true, data: enquiries });
    }

    if (req.method === 'POST') {
      const { name, phone, email, requirement, product, message } = req.body || {};
      if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and Phone are required.' });
      }
      const newEnquiry = {
        id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : undefined,
        requirement: requirement || 'General Enquiry',
        product: product || undefined,
        message: message || undefined,
        source: 'website_modal',
        createdAt: new Date().toISOString(),
        status: 'new'
      };
      enquiries.unshift(newEnquiry);
      writeStore(ENQUIRIES_FILE, enquiries);
      return res.status(201).json({ success: true, message: 'Enquiry received successfully.', data: newEnquiry });
    }

    if (req.method === 'PUT') {
      const parts = cleanUrl.split('/');
      const id = parts[parts.length - 1];
      const { status } = req.body || {};
      const index = enquiries.findIndex((e: any) => e.id === id);
      if (index !== -1 && status) {
        enquiries[index].status = status;
        writeStore(ENQUIRIES_FILE, enquiries);
      }
      return res.status(200).json({ success: true, message: 'Status updated.' });
    }

    if (req.method === 'DELETE') {
      const parts = cleanUrl.split('/');
      const id = parts[parts.length - 1];
      const filtered = enquiries.filter((e: any) => e.id !== id);
      writeStore(ENQUIRIES_FILE, filtered);
      return res.status(200).json({ success: true, message: 'Enquiry deleted.' });
    }
  }

  // 5. Repairs API
  if (cleanUrl.startsWith('/api/repairs')) {
    const repairs = readStore(REPAIRS_FILE, INITIAL_REPAIRS);

    if (req.method === 'GET') {
      return res.status(200).json({ success: true, data: repairs });
    }

    if (req.method === 'POST') {
      const { name, phone, chairType, issueType, issueDescription, address } = req.body || {};
      if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and Phone are required.' });
      }
      const newRepair = {
        id: `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: String(name).trim(),
        phone: String(phone).trim(),
        chairType: chairType || 'Executive Revolving Chair',
        issueType: issueType || 'gas_lift_sinking',
        issueDescription: issueDescription || '',
        address: address || '',
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      repairs.unshift(newRepair);
      writeStore(REPAIRS_FILE, repairs);
      return res.status(201).json({ success: true, message: 'Repair request booked successfully.', data: newRepair });
    }

    if (req.method === 'PUT') {
      const parts = cleanUrl.split('/');
      const id = parts[parts.length - 1];
      const { status } = req.body || {};
      const index = repairs.findIndex((r: any) => r.id === id);
      if (index !== -1 && status) {
        repairs[index].status = status;
        writeStore(REPAIRS_FILE, repairs);
      }
      return res.status(200).json({ success: true, message: 'Repair status updated.' });
    }

    if (req.method === 'DELETE') {
      const parts = cleanUrl.split('/');
      const id = parts[parts.length - 1];
      const filtered = repairs.filter((r: any) => r.id !== id);
      writeStore(REPAIRS_FILE, filtered);
      return res.status(200).json({ success: true, message: 'Repair order deleted.' });
    }
  }

  // Fallback 404
  return res.status(404).json({ success: false, message: `Route ${req.method} ${cleanUrl} not found on Balaji API.` });
}
