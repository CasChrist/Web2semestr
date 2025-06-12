import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.API_GATEWAY_PORT || 3000;

const services = {
  user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3003',
  courses: process.env.COURSES_SERVICE_URL || 'http://localhost:3002',
  lessons: process.env.LESSONS_SERVICE_URL || 'http://localhost:3006',
  comments: process.env.COMMENTS_SERVICE_URL || 'http://localhost:3005',
  enrollments: process.env.ENROLLMENT_SERVICE_URL || 'http://localhost:3004',
};

app.use('/api/user', createProxyMiddleware({ target: services.user, changeOrigin: true }));
app.use('/api/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/api/courses', createProxyMiddleware({ target: services.courses, changeOrigin: true }));
app.use('/api/lessons', createProxyMiddleware({ target: services.lessons, changeOrigin: true }));
app.use('/api/comments', createProxyMiddleware({ target: services.comments, changeOrigin: true }));
app.use('/api/enrollments', createProxyMiddleware({ target: services.enrollments, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
