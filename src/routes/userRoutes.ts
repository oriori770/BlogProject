import express from 'express';
import {getUsers, deleteUserById, getStatistics} from '../controllers/userController';
import { authMiddleware, managerAuthMiddleware } from '../middleware/authMiddleware';;
import { errorHandler } from '../utils/errorHandler';

const router = express.Router();

// routes/users.js


/**
 * @swagger
 * /users:
 *  get:
 *    tags: [users]
 *    summary: קבלת כל המשתמשים
 *    description: תחזיר רשימה של כל המשתמשים, זמין רק למנהלים
 *    responses:
 *      200:
 *        description: רשימת המשתמשים הוחזרה בהצלחה
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */




router.get("/", authMiddleware, managerAuthMiddleware, errorHandler(getUsers));
router.get('/statistics', authMiddleware, managerAuthMiddleware, getStatistics)
router.delete("/:id", authMiddleware, managerAuthMiddleware, errorHandler(deleteUserById))


export default router;