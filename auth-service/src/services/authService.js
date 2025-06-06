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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_1 = require("../../src/models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (firstName, lastName, username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.UserModel.findOne({ username });
    if (existingUser) {
        throw new Error('User already exist');
    }
    const user = new user_1.UserModel({ firstName, lastName, username, password, role });
    yield user.save();
    return user;
});
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ username });
    if (!user) {
        throw new Error('User not found!');
    }
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid) {
        throw new Error('Invalid password!');
    }
    return user;
});
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.authService = {
    registerUser,
    generateToken,
    loginUser,
};
