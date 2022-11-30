import express from 'express';
import {
  adminHandler,
  getAllUsersHandler,
  loginHandler,
  registerHandler,
  userHandler,
} from '../controlers/logincontroler';
import { authorize, protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../zod_schema/loginSchema';

const router = express.Router();

router.post('/login', validate(loginSchema), loginHandler);
router.get('/users', protect, getAllUsersHandler);
router.post('/register', validate(registerSchema), registerHandler);
router.get('/admin', protect, authorize('ADMIN'), adminHandler);
router.get('/user', protect, authorize('USER', 'ADMIN'), userHandler);
router.get('/superuser', protect, authorize('ADMIN'), adminHandler);

export default router;
