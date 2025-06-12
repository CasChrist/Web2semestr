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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const maxRetries = 5;
    const retryDelay = 3000; // 3 seconds
    let attempts = 0;
    while (attempts < maxRetries) {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            console.log('MongoDB connected!');
            return;
        }
        catch (error) {
            attempts++;
            console.error(`MongoDB connection error (attempt ${attempts}): `, error);
            if (attempts >= maxRetries) {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            yield new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
    }
});
exports.connectDB = connectDB;
