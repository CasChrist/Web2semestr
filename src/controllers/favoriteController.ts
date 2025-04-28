import { Request, Response } from 'express';
import { UserModel } from '../models/user';

const addFavoriteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const courseId = req.params.courseId;

    if (!userId || !courseId) {
      res.status(400).json({ message: 'User ID and Course ID are required' });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.favorites && user.favorites.includes(courseId)) {
      res.status(400).json({ message: 'Course already in favorites' });
      return;
    }

    user.favorites = user.favorites ? [...user.favorites, courseId] : [courseId];
    await user.save();

    res.status(200).json({ message: 'Course added to favorites' });
  } catch (error) {
    console.error('Error adding favorite course:', error);
    res.status(500).json({ message: 'Failed to add favorite course' });
  }
};

const removeFavoriteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const courseId = req.params.courseId;

    if (!userId || !courseId) {
      res.status(400).json({ message: 'User ID and Course ID are required' });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (!user.favorites || !user.favorites.includes(courseId)) {
      res.status(400).json({ message: 'Course not in favorites' });
      return;
    }

    user.favorites = user.favorites.filter(fav => fav !== courseId);
    await user.save();

    res.status(200).json({ message: 'Course removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite course:', error);
    res.status(500).json({ message: 'Failed to remove favorite course' });
  }
};

const getFavoriteCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const user = await UserModel.findById(userId).populate('favorites');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error fetching favorite courses:', error);
    res.status(500).json({ message: 'Failed to fetch favorite courses' });
  }
};

export const favoriteController = {
  addFavoriteCourse,
  removeFavoriteCourse,
  getFavoriteCourses,
};
