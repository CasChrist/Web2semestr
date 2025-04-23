import { Request, Response } from 'express';
import { CourseModel } from '../models/course';

const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      level,
      published,
      search,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Build filter object
    const filter: Record<string, string | boolean | object> = {};
    if (category) filter.category = category as string;
    if (level) filter.level = level as string;
    if (published !== undefined) filter.published = published === 'true';
    if (search) filter.title = { $regex: search, $options: 'i' };

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const courses = await CourseModel.find(filter)
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .exec();

    const total = await CourseModel.countDocuments(filter);

    res.status(200).json({
      data: courses,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get courses', error });
  }
};

const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await CourseModel.findById(req.params.id).exec();
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get course', error });
  }
};

const updateCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).exec();
    if (!updatedCourse) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error });
  }
};

const deleteCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id).exec();
    if (!deletedCourse) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error });
  }
};

export const courseController = {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
