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
exports.lessonController = void 0;
const lesson_1 = require("../../src/models/lesson");
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = '1', limit = '10', sortBy = 'order', sortOrder = 'asc', course, } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const filter = {};
        if (course && typeof course === 'string')
            filter.course = course;
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const lessons = yield lesson_1.LessonModel.find(filter)
            .sort(sort)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();
        const total = yield lesson_1.LessonModel.countDocuments(filter);
        res.status(200).json({
            data: lessons,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get lessons', error });
    }
});
const getLessonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lesson = yield lesson_1.LessonModel.findById(req.params.id).exec();
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found' });
            return;
        }
        res.status(200).json(lesson);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get lesson', error });
    }
});
const createLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, videoUrl, course, order } = req.body;
        if (!title || !course) {
            res
                .status(400)
                .json({ message: 'Missing required fields: title or course' });
            return;
        }
        const newLesson = new lesson_1.LessonModel({
            title,
            content,
            videoUrl,
            course,
            order,
        });
        const savedLesson = yield newLesson.save();
        res.status(201).json(savedLesson);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create lesson', error });
    }
});
const updateLessonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedLesson = yield lesson_1.LessonModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();
        if (!updatedLesson) {
            res.status(404).json({ message: 'Lesson not found' });
            return;
        }
        res.status(200).json(updatedLesson);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update lesson', error });
    }
});
const deleteLessonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedLesson = yield lesson_1.LessonModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedLesson) {
            res.status(404).json({ message: 'Lesson not found' });
            return;
        }
        res.status(200).json({ message: 'Lesson deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete lesson', error });
    }
});
exports.lessonController = {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLessonById,
    deleteLessonById,
};
