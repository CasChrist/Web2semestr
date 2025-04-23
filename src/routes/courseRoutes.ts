import { Router } from 'express';
import { courseController } from '../controllers/courseController';

const router = Router();

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourseById);
router.delete('/courses/:id', courseController.deleteCourseById);

export const courseRoutes = router;
