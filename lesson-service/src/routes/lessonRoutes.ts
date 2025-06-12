import { Router } from 'express';
import { lessonController } from '../controllers/lessonController';

const router = Router();

router.get('/', lessonController.getAllLessons);
router.get('/:id', lessonController.getLessonById);
router.post('/', lessonController.createLesson);
router.put('/:id', lessonController.updateLessonById);
router.delete('/:id', lessonController.deleteLessonById);

export const lessonRoutes = router;
