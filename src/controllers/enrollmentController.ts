import { Request, Response } from 'express';
import { EnrollmentModel } from '../models/enrollment';
import { LessonModel } from '../models/lesson';

const calculateProgress = async (userId: string, courseId: string) => {
  const enrollment = await EnrollmentModel.findOne({ user: userId, course: courseId }).exec();
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  const totalLessons = await LessonModel.countDocuments({ course: courseId }).exec();
  const completedCount = enrollment.completedLessons.length;
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  return { enrollment, progress, totalLessons, completedCount };
};

const enrollUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      res.status(400).json({ message: 'Missing userId or courseId' });
      return;
    }

    const existingEnrollment = await EnrollmentModel.findOne({ user: userId, course: courseId }).exec();
    if (existingEnrollment) {
      res.status(400).json({ message: 'User already enrolled in this course' });
      return;
    }

    const enrollment = new EnrollmentModel({
      user: userId,
      course: courseId,
      completedLessons: [],
    });

    const savedEnrollment = await enrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Enrollment not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to enroll user', error });
    }
  }
};

const getEnrollmentProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.params;
    if (!userId || !courseId) {
      res.status(400).json({ message: 'Missing userId or courseId' });
      return;
    }

    const result = await calculateProgress(userId, courseId);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Enrollment not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to get enrollment progress', error });
    }
  }
};

const cancelLessonCompletion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId, lessonId } = req.body;
    if (!userId || !courseId || !lessonId) {
      res.status(400).json({ message: 'Missing userId, courseId or lessonId' });
      return;
    }

    const enrollment = await EnrollmentModel.findOne({ user: userId, course: courseId }).exec();
    if (!enrollment) {
      res.status(404).json({ message: 'Enrollment not found' });
      return;
    }

    enrollment.completedLessons = enrollment.completedLessons.filter(
      (lesson) => lesson.toString() !== lessonId
    );

    await enrollment.save();

    const result = await calculateProgress(userId, courseId);

    res.status(200).json({
      message: 'Lesson completion cancelled',
      ...result,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to cancel lesson completion', error });
  }
};

const getEnrolledStudentsCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      res.status(400).json({ message: 'Missing courseId' });
      return;
    }

    const count = await EnrollmentModel.countDocuments({ course: courseId }).exec();
    res.status(200).json({ courseId, enrolledStudents: count });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to get enrolled students count', error });
  }
};

export const enrollmentController = {
  enrollUser,
  getEnrollmentProgress,
  cancelLessonCompletion,
  getEnrolledStudentsCount,
  calculateProgress,
};
