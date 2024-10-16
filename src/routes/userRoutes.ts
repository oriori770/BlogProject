import express from 'express';
import {getUsers, deleteUserById, getStatistics} from '../controllers/userController';
import { authMiddleware, managerAuthMiddleware } from '../middleware/authMiddleware';;
import { errorHandler } from '../utils/errorHandler';

const router = express.Router();

router.get("/", authMiddleware, managerAuthMiddleware, errorHandler(getUsers));
router.get('/statistics', authMiddleware, managerAuthMiddleware, getStatistics)
router.delete("/:id", authMiddleware, managerAuthMiddleware, errorHandler(deleteUserById))


export default router;