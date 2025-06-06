"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.authController.register);
router.post('/signin', authController_1.authController.login);
exports.authRoutes = router;
