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
exports.favoriteController = void 0;
const user_1 = require("../../src/models/user");
const addFavoriteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const courseId = req.params.courseId;
        if (!userId || !courseId) {
            res.status(400).json({ message: 'User ID and Course ID are required' });
            return;
        }
        const user = yield user_1.UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.favorites && user.favorites.includes(courseId)) {
            res.status(400).json({ message: 'Course already in favorites' });
            return;
        }
        user.favorites = user.favorites
            ? [...user.favorites, courseId]
            : [courseId];
        yield user.save();
        res.status(200).json({ message: 'Course added to favorites' });
    }
    catch (error) {
        console.error('Error adding favorite course:', error);
        res.status(500).json({ message: 'Failed to add favorite course' });
    }
});
const removeFavoriteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const courseId = req.params.courseId;
        if (!userId || !courseId) {
            res.status(400).json({ message: 'User ID and Course ID are required' });
            return;
        }
        const user = yield user_1.UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (!user.favorites || !user.favorites.includes(courseId)) {
            res.status(400).json({ message: 'Course not in favorites' });
            return;
        }
        user.favorites = user.favorites.filter((fav) => fav !== courseId);
        yield user.save();
        res.status(200).json({ message: 'Course removed from favorites' });
    }
    catch (error) {
        console.error('Error removing favorite course:', error);
        res.status(500).json({ message: 'Failed to remove favorite course' });
    }
});
const getFavoriteCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const user = yield user_1.UserModel.findById(userId).populate('favorites');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ favorites: user.favorites });
    }
    catch (error) {
        console.error('Error fetching favorite courses:', error);
        res.status(500).json({ message: 'Failed to fetch favorite courses' });
    }
});
exports.favoriteController = {
    addFavoriteCourse,
    removeFavoriteCourse,
    getFavoriteCourses,
};
