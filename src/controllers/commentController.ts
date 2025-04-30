import { Request, Response } from 'express';
import { CommentModel } from '../models/comment';

const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lesson } = req.query;
    const filter: Record<string, unknown> = {};
    if (lesson && typeof lesson === 'string') {
      filter.lesson = lesson;
    }
    const comments = await CommentModel.find(filter)
      .populate('user', 'username email') // populate user with selected fields
      .populate('lesson', 'title')
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comments', error });
  }
};

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await CommentModel.findById(req.params.id)
      .populate('user', 'username email')
      .populate('lesson', 'title')
      .exec();
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comment', error });
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, lesson, text } = req.body;
    if (!user || !lesson || !text) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    if (text.length > 255) {
      res.status(400).json({ message: 'Text exceeds 255 characters' });
      return;
    }
    const newComment = new CommentModel({ user, lesson, text });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment', error });
  }
};

const updateCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (text && text.length > 255) {
      res.status(400).json({ message: 'Text exceeds 255 characters' });
      return;
    }
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).exec();
    if (!updatedComment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error });
  }
};

const deleteCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(req.params.id).exec();
    if (!deletedComment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
};

export const commentController = {
  getAllComments,
  getCommentById,
  createComment,
  updateCommentById,
  deleteCommentById,
};
