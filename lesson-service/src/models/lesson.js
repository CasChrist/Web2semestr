"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModel = void 0;
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    order: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.LessonModel = (0, mongoose_1.model)('Lesson', lessonSchema);
