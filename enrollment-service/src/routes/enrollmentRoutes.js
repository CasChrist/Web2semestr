"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentRoutes = void 0;
const express_1 = require("express");
const enrollmentController_1 = require("../controllers/enrollmentController");
const router = (0, express_1.Router)();
router.post('/enroll', enrollmentController_1.enrollmentController.enrollUser);
router.get('/progress/:userId/:courseId', enrollmentController_1.enrollmentController.getEnrollmentProgress);
router.post('/cancel-lesson', enrollmentController_1.enrollmentController.cancelLessonCompletion);
router.get('/students-count/:courseId', enrollmentController_1.enrollmentController.getEnrolledStudentsCount);
// New endpoint to get enrollment processing status
router.get('/status/:userId/:courseId', (req, res) => {
    // For demo, return a static status. In real app, implement status tracking.
    res
        .status(200)
        .json({
        userId: req.params.userId,
        courseId: req.params.courseId,
        status: 'processed',
    });
});
exports.enrollmentRoutes = router;
