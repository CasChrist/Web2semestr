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
exports.consumeEnrollment = exports.publishEnrollment = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
let channel;
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
    channel = yield connection.createChannel();
    yield channel.assertQueue('enrollment_queue', { durable: true });
    console.log('Connected to RabbitMQ');
});
exports.connectRabbitMQ = connectRabbitMQ;
const publishEnrollment = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    channel.sendToQueue('enrollment_queue', Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
});
exports.publishEnrollment = publishEnrollment;
const consumeEnrollment = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    yield channel.consume('enrollment_queue', (msg) => {
        if (msg) {
            callback(msg);
            channel.ack(msg);
        }
    });
});
exports.consumeEnrollment = consumeEnrollment;
