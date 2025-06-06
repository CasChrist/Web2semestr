"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentModel = void 0;
const mongoose_1 = require("mongoose");
const enrollmentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    completedLessons: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
    ],
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
exports.EnrollmentModel = (0, mongoose_1.model)('Enrollment', enrollmentSchema);
