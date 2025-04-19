import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/myProfile', authenticateJWT, userController.getProfile);

export const userRoutes = router;
