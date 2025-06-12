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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
var Role;
(function (Role) {
    Role["Teacher"] = "teacher";
    Role["Student"] = "student";
})(Role || (Role = {}));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true,
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Если пароль не изменен, переходим к следующему middleware
        if (!this.isModified('password'))
            return next();
        try {
            // Генерация соли
            const salt = yield bcrypt_1.default.genSalt(10);
            // Хеширование пароля
            const hash = yield bcrypt_1.default.hash(this.password, salt);
            // Заменяем пароль на хеш
            this.password = hash;
            // Переходим к следующему middleware
            next();
        }
        catch (err) {
            return next(err);
        }
    });
});
userSchema.method('comparePassword', function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, this.password);
    });
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
