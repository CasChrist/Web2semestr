import { Router } from 'express';
import { enrollmentController } from '../controllers/enrollmentController';

const router = Router();

router.post('/enroll', enrollmentController.enrollUser);
router.get('/progress/:userId/:courseId', enrollmentController.getEnrollmentProgress);
router.post('/cancel-lesson', enrollmentController.cancelLessonCompletion);
router.get('/students-count/:courseId', enrollmentController.getEnrolledStudentsCount);

// New endpoint to get enrollment processing status
router.get('/status/:userId/:courseId', (req, res) => {
  // For demo, return a static status. In real app, implement status tracking.
  res.status(200).json({ userId: req.params.userId, courseId: req.params.courseId, status: 'processed' });
});

export const enrollmentRoutes = router;
