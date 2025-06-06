"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const authRoutes_1 = require("./routes/authRoutes");
dotenv_1.default.config();
const PORT = process.env.AUTH_SERVICE_PORT || 3003;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.authRoutes);
app.listen(PORT, () => {
    console.log(`Auth service running on http://localhost:${PORT}`);
});
