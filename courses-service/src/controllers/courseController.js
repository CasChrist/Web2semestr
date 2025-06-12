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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const course_1 = require("../../src/models/course");
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = '1', limit = '10', sortBy = 'createdAt', sortOrder = 'desc', category, level, published, search, } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        // Build filter object
        const filter = {};
        if (category)
            filter.category = category;
        if (level)
            filter.level = level;
        if (published !== undefined)
            filter.published = published === 'true';
        if (search)
            filter.title = { $regex: search, $options: 'i' };
        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const courses = yield course_1.CourseModel.find(filter)
            .sort(sort)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();
        const total = yield course_1.CourseModel.countDocuments(filter);
        res.status(200).json({
            data: courses,
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get courses', error });
    }
});
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.CourseModel.findById(req.params.id)
            .populate('lessons')
            .exec();
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get course', error });
    }
});
const updateCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { tags } = _a, updateData = __rest(_a, ["tags"]);
        // Parse tags if provided as comma-separated string
        let parsedTags;
        if (tags) {
            if (Array.isArray(tags)) {
                parsedTags = tags;
            }
            else if (typeof tags === 'string') {
                parsedTags = tags.split(',').map((tag) => tag.trim());
            }
        }
        const updatedCourse = yield course_1.CourseModel.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, updateData), { tags: parsedTags }), { new: true, runValidators: true }).exec();
        if (!updatedCourse) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json(updatedCourse);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update course', error });
    }
});
const deleteCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield course_1.CourseModel.findByIdAndDelete(req.params.id).exec();
        if (!deletedCourse) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error });
    }
});
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, category, level = 'beginner', published = false, author, tags, } = req.body;
        if (!title || !price || !category || !author) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        if (!req.file) {
            res.status(400).json({ message: 'Image file is required' });
            return;
        }
        const image = req.file.filename;
        // Parse tags if provided as comma-separated string
        let parsedTags;
        if (tags) {
            if (Array.isArray(tags)) {
                parsedTags = tags;
            }
            else if (typeof tags === 'string') {
                parsedTags = tags.split(',').map((tag) => tag.trim());
            }
        }
        const newCourse = new course_1.CourseModel({
            title,
            description,
            price,
            image,
            category,
            level,
            published,
            author,
            tags: parsedTags,
        });
        const savedCourse = yield newCourse.save();
        res.status(201).json(savedCourse);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create course', error });
    }
});
exports.courseController = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById,
};
