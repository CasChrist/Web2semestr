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
exports.authController = void 0;
const authService_1 = require("../services/authService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, password, role } = req.body;
        const user = yield authService_1.authService.registerUser(firstName, lastName, username, password, role);
        const token = authService_1.authService.generateToken(user._id.toString());
        res.status(201).json({ token });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield authService_1.authService.loginUser(username, password);
        const token = authService_1.authService.generateToken(user._id.toString());
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.authController = {
    register,
    login,
};
