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
exports.enrollmentController = void 0;
const enrollment_1 = require("../../src/models/enrollment");
const lesson_1 = require("../../src/models/lesson");
const calculateProgress = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollment = yield enrollment_1.EnrollmentModel.findOne({
        user: userId,
        course: courseId,
    }).exec();
    if (!enrollment) {
        throw new Error('Enrollment not found');
    }
    const totalLessons = yield lesson_1.LessonModel.countDocuments({
        course: courseId,
    }).exec();
    const completedCount = enrollment.completedLessons.length;
    const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
    return { enrollment, progress, totalLessons, completedCount };
});
const rabbitmq_1 = require("../rabbitmq");
const enrollUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            res.status(400).json({ message: 'Missing userId or courseId' });
            return;
        }
        // Publish enrollment request to RabbitMQ
        yield (0, rabbitmq_1.publishEnrollment)({ userId, courseId });
        // Return 200 immediately
        res.status(200).json({ message: 'Enrollment request received' });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Failed to enqueue enrollment request', error });
    }
});
const getEnrollmentProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            res.status(400).json({ message: 'Missing userId or courseId' });
            return;
        }
        const result = yield calculateProgress(userId, courseId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Enrollment not found') {
            res.status(404).json({ message: error.message });
        }
        else {
            res
                .status(500)
                .json({ message: 'Failed to get enrollment progress', error });
        }
    }
});
const cancelLessonCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId, lessonId } = req.body;
        if (!userId || !courseId || !lessonId) {
            res.status(400).json({ message: 'Missing userId, courseId or lessonId' });
            return;
        }
        const enrollment = yield enrollment_1.EnrollmentModel.findOne({
            user: userId,
            course: courseId,
        }).exec();
        if (!enrollment) {
            res.status(404).json({ message: 'Enrollment not found' });
            return;
        }
        enrollment.completedLessons = enrollment.completedLessons.filter((lesson) => lesson.toString() !== lessonId);
        yield enrollment.save();
        const result = yield calculateProgress(userId, courseId);
        res.status(200).json(Object.assign({ message: 'Lesson completion cancelled' }, result));
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Failed to cancel lesson completion', error });
    }
});
const getEnrolledStudentsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            res.status(400).json({ message: 'Missing courseId' });
            return;
        }
        const count = yield enrollment_1.EnrollmentModel.countDocuments({
            course: courseId,
        }).exec();
        res.status(200).json({ courseId, enrolledStudents: count });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Failed to get enrolled students count', error });
    }
});
exports.enrollmentController = {
    enrollUser,
    getEnrollmentProgress,
    cancelLessonCompletion,
    getEnrolledStudentsCount,
    calculateProgress,
};
