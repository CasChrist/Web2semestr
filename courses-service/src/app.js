"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const courseRoutes_1 = require("./routes/courseRoutes");
dotenv_1.default.config();
const PORT = process.env.COURSES_SERVICE_PORT || 3002;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/courses', courseRoutes_1.courseRoutes);
app.listen(PORT, () => {
    console.log(`Courses service running on http://localhost:${PORT}`);
});
