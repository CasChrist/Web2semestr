"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const lessonRoutes_1 = require("./routes/lessonRoutes");
dotenv_1.default.config();
const PORT = process.env.LESSON_SERVICE_PORT || 3006;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/lessons', lessonRoutes_1.lessonRoutes);
app.listen(PORT, () => {
    console.log(`Lesson service running on http://localhost:${PORT}`);
});
