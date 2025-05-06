import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';

const router = Router();

router.post('/enroll', enrollmentController.enrollUser);
router.get('/progress/:userId/:courseId', enrollmentController.getEnrollmentProgress);
router.post('/cancel-lesson', enrollmentController.cancelLessonCompletion);
router.get('/students-count/:courseId', enrollmentController.getEnrolledStudentsCount);

export const enrollmentRoutes = router;
