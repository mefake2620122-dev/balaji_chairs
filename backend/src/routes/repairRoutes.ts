import { Router } from 'express';
import {
  createRepairRequest,
  getRepairRequests,
  updateRepairStatus,
  deleteRepairRequest
} from '../controllers/enquiryController';

const router = Router();

router.post('/', createRepairRequest);
router.get('/', getRepairRequests);
router.put('/:id', updateRepairStatus);
router.delete('/:id', deleteRepairRequest);

export default router;
