"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const comment_1 = require("../../src/models/comment");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lesson } = req.query;
        const filter = {};
        if (lesson && typeof lesson === 'string') {
            filter.lesson = lesson;
        }
        const comments = yield comment_1.CommentModel.find(filter)
            .populate('user', 'username email') // populate user with selected fields
            .populate('lesson', 'title')
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error });
    }
});
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.CommentModel.findById(req.params.id)
            .populate('user', 'username email')
            .populate('lesson', 'title')
            .exec();
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get comment', error });
    }
});
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newComment = new comment_1.CommentModel({ user, lesson, text });
        const savedComment = yield newComment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
});
const updateCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (text && text.length > 255) {
            res.status(400).json({ message: 'Text exceeds 255 characters' });
            return;
        }
        const updatedComment = yield comment_1.CommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
        if (!updatedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update comment', error });
    }
});
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComment = yield comment_1.CommentModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedComment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error });
    }
});
exports.commentController = {
    getAllComments,
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentById,
};
