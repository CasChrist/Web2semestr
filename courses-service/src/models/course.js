"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const uuid_1 = require("uuid");
const courseSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: uuid_1.v4,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        default: 'beginner',
    },
    published: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tags: {
        type: [String],
        default: [],
    },
});
// Pre-save middleware to generate slug from title
courseSchema.pre('validate', function (next) {
    if (this.title && !this.slug) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
// Virtual field to populate lessons
courseSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'course',
    justOne: false,
});
courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });
exports.CourseModel = (0, mongoose_1.model)('Course', courseSchema);
