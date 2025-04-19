import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/myProfile', authenticateJWT, userController.getProfile);
router.delete('/myProfile', authenticateJWT, userController.deleteUser);

export const userRoutes = router;
