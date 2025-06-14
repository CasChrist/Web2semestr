import { Router } from 'express';
import { courseController } from '../controllers/courseController';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', upload.single('image'), courseController.createCourse);
router.put('/:id', courseController.updateCourseById);
router.delete('/:id', courseController.deleteCourseById);

export const courseRoutes = router;
