"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.CommentModel = (0, mongoose_1.model)('Comment', commentSchema);
