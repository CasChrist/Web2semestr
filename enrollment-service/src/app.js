"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const enrollmentRoutes_1 = require("./routes/enrollmentRoutes");
dotenv_1.default.config();
const PORT = process.env.ENROLLMENT_SERVICE_PORT || 3004;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/enrollments', enrollmentRoutes_1.enrollmentRoutes);
app.listen(PORT, () => {
    console.log(`Enrollment service running on http://localhost:${PORT}`);
});
