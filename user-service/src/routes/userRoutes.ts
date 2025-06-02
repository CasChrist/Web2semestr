import { Router } from 'express';
import { userController } from '../controllers/userController';
import { favoriteController } from '../controllers/favoriteController';
import { authenticateJWT } from '../../src/middlewares/authMiddleware';

const router = Router();

router.get('/myProfile', authenticateJWT, userController.getProfile);
router.delete('/myProfile', authenticateJWT, userController.deleteUser);

router.post(
  '/favorites/:courseId',
  authenticateJWT,
  favoriteController.addFavoriteCourse
);
router.delete(
  '/favorites/:courseId',
  authenticateJWT,
  favoriteController.removeFavoriteCourse
);
router.get(
  '/favorites',
  authenticateJWT,
  favoriteController.getFavoriteCourses
);

export const userRoutes = router;
