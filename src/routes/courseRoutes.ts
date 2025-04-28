import { Router } from 'express';
import { courseController } from '../controllers/courseController';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', upload.single('image'), courseController.createCourse);
router.put('/courses/:id', courseController.updateCourseById);
router.delete('/courses/:id', courseController.deleteCourseById);

export const courseRoutes = router;
