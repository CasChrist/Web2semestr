import { Request, Response } from 'express';
import { LessonModel } from '../../src/models/lesson';

const getAllLessons = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy = 'order',
      sortOrder = 'asc',
      course,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: Record<string, string | boolean | undefined> = {};
    if (course && typeof course === 'string') filter.course = course;

    const sort: Record<string, 1 | -1> = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const lessons = await LessonModel.find(filter)
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    const total = await LessonModel.countDocuments(filter);

    res.status(200).json({
      data: lessons,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get lessons', error });
  }
};

const getLessonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lesson = await LessonModel.findById(req.params.id).exec();
    if (!lesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get lesson', error });
  }
};

const createLesson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, videoUrl, course, order } = req.body;

    if (!title || !course) {
      res
        .status(400)
        .json({ message: 'Missing required fields: title or course' });
      return;
    }

    const newLesson = new LessonModel({
      title,
      content,
      videoUrl,
      course,
      order,
    });

    const savedLesson = await newLesson.save();
    res.status(201).json(savedLesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create lesson', error });
  }
};

const updateLessonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLesson = await LessonModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedLesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lesson', error });
  }
};

const deleteLessonById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedLesson = await LessonModel.findByIdAndDelete(
      req.params.id
    ).exec();
    if (!deletedLesson) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }
    res.status(200).json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lesson', error });
  }
};

export const lessonController = {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLessonById,
  deleteLessonById,
};
