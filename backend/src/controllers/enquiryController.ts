import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Enquiry, RepairRequest } from '../types';

const getDataPath = (filename: string) => {
  const distPath = path.join(__dirname, '../data', filename);
  if (fs.existsSync(distPath)) return distPath;
  const srcPath = path.join(__dirname, '../../src/data', filename);
  if (fs.existsSync(srcPath)) return srcPath;
  return path.join(process.cwd(), 'src/data', filename);
};

const enquiriesFilePath = getDataPath('enquiries.json');
const repairsFilePath = getDataPath('repairs.json');

// Helper to read JSON
const readData = <T>(filePath: string): T[] => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

// Helper to write JSON
const writeData = <T>(filePath: string, data: T[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const createEnquiry = (req: Request, res: Response) => {
  try {
    const { name, phone, email, requirement, product, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required fields.'
      });
    }

    const cleanPhone = String(phone).replace(/\s+/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number.'
      });
    }

    const newEnquiry: Enquiry = {
      id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(name).trim(),
      phone: cleanPhone,
      email: email ? String(email).trim() : undefined,
      requirement: requirement ? String(requirement).trim() : 'General Enquiry',
      product: product ? String(product).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      source: source || 'website_modal',
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    const existingEnquiries = readData<Enquiry>(enquiriesFilePath);
    existingEnquiries.unshift(newEnquiry);
    writeData<Enquiry>(enquiriesFilePath, existingEnquiries);

    // Also build a preformatted WhatsApp intent text for frontend convenience
    const waText = encodeURIComponent(
      `Hello Balaji Chairs, my name is ${newEnquiry.name}. I am enquiring regarding ${newEnquiry.product || newEnquiry.requirement}. Please share details and pricing.`
    );
    const whatsappRedirectUrl = `https://wa.me/917880353900?text=${waText}`;

    return res.status(201).json({
      success: true,
      message: 'Enquiry received successfully. Our team will contact you shortly.',
      enquiryId: newEnquiry.id,
      whatsappRedirectUrl,
      data: newEnquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while saving enquiry.',
      error: (error as Error).message
    });
  }
};

export const getEnquiries = (req: Request, res: Response) => {
  try {
    const enquiries = readData<Enquiry>(enquiriesFilePath);
    return res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries',
      error: (error as Error).message
    });
  }
};

export const createRepairRequest = (req: Request, res: Response) => {
  try {
    const { name, phone, chairType, issueTypes, quantity, location, notes } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required fields.'
      });
    }

    const cleanPhone = String(phone).replace(/\s+/g, '');
    const newRepair: RepairRequest = {
      id: `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: String(name).trim(),
      phone: cleanPhone,
      chairType: chairType || 'Revolving Chair',
      issueTypes: Array.isArray(issueTypes) ? issueTypes : ['General Maintenance'],
      quantity: Number(quantity) || 1,
      location: location ? String(location).trim() : 'Unnao',
      notes: notes ? String(notes).trim() : undefined,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const existingRepairs = readData<RepairRequest>(repairsFilePath);
    existingRepairs.unshift(newRepair);
    writeData<RepairRequest>(repairsFilePath, existingRepairs);

    const issuesJoined = newRepair.issueTypes.join(', ');
    const waText = encodeURIComponent(
      `Hello Balaji Chairs, I need chair repair service. Name: ${newRepair.name}, Phone: ${newRepair.phone}, Chair Type: ${newRepair.chairType}, Issues: ${issuesJoined}, Qty: ${newRepair.quantity}. Please assist.`
    );
    const whatsappRedirectUrl = `https://wa.me/917880353900?text=${waText}`;

    return res.status(201).json({
      success: true,
      message: 'Repair request booked successfully.',
      repairId: newRepair.id,
      whatsappRedirectUrl,
      data: newRepair
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to record repair request',
      error: (error as Error).message
    });
  }
};

export const getRepairRequests = (req: Request, res: Response) => {
  try {
    const repairs = readData<RepairRequest>(repairsFilePath);
    return res.json({
      success: true,
      count: repairs.length,
      data: repairs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve repair requests',
      error: (error as Error).message
    });
  }
};

export const updateEnquiryStatus = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'resolved'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, contacted, resolved.'
      });
    }

    const enquiries = readData<Enquiry>(enquiriesFilePath);
    const index = enquiries.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Enquiry with ID ${id} not found.`
      });
    }

    enquiries[index].status = status as Enquiry['status'];
    writeData<Enquiry>(enquiriesFilePath, enquiries);

    return res.json({
      success: true,
      message: `Enquiry status updated to ${status}.`,
      data: enquiries[index]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status',
      error: (error as Error).message
    });
  }
};

export const deleteEnquiry = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enquiries = readData<Enquiry>(enquiriesFilePath);
    const filtered = enquiries.filter((e) => e.id !== id);

    if (filtered.length === enquiries.length) {
      return res.status(404).json({
        success: false,
        message: `Enquiry with ID ${id} not found.`
      });
    }

    writeData<Enquiry>(enquiriesFilePath, filtered);
    return res.json({
      success: true,
      message: 'Enquiry deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: (error as Error).message
    });
  }
};

export const updateRepairStatus = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'scheduled', 'completed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, scheduled, completed.'
      });
    }

    const repairs = readData<RepairRequest>(repairsFilePath);
    const index = repairs.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Repair request with ID ${id} not found.`
      });
    }

    repairs[index].status = status as RepairRequest['status'];
    writeData<RepairRequest>(repairsFilePath, repairs);

    return res.json({
      success: true,
      message: `Repair status updated to ${status}.`,
      data: repairs[index]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update repair status',
      error: (error as Error).message
    });
  }
};

export const deleteRepairRequest = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repairs = readData<RepairRequest>(repairsFilePath);
    const filtered = repairs.filter((r) => r.id !== id);

    if (filtered.length === repairs.length) {
      return res.status(404).json({
        success: false,
        message: `Repair request with ID ${id} not found.`
      });
    }

    writeData<RepairRequest>(repairsFilePath, filtered);
    return res.json({
      success: true,
      message: 'Repair request deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete repair request',
      error: (error as Error).message
    });
  }
};
