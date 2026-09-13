import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiryController';

const router = Router();

router.post('/', createEnquiry);
router.get('/', getEnquiries);
router.put('/:id', updateEnquiryStatus);
router.delete('/:id', deleteEnquiry);

export default router;
