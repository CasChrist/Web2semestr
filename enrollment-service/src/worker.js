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
const rabbitmq_1 = require("./rabbitmq");
const enrollment_1 = require("./models/enrollment");
const processEnrollment = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = msg.content.toString();
        const { userId, courseId } = JSON.parse(content);
        // Check if enrollment already exists
        const existingEnrollment = yield enrollment_1.EnrollmentModel.findOne({
            user: userId,
            course: courseId,
        }).exec();
        if (existingEnrollment) {
            console.log(`User ${userId} already enrolled in course ${courseId}`);
            return;
        }
        // Create new enrollment
        const enrollment = new enrollment_1.EnrollmentModel({
            user: userId,
            course: courseId,
            completedLessons: [],
        });
        yield enrollment.save();
        console.log(`Enrollment processed for user ${userId} in course ${courseId}`);
    }
    catch (error) {
        console.error('Failed to process enrollment:', error);
    }
});
const startWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, rabbitmq_1.connectRabbitMQ)();
    yield (0, rabbitmq_1.consumeEnrollment)(processEnrollment);
    console.log('Enrollment worker started');
});
startWorker().catch(console.error);
