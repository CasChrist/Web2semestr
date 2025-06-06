import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { courseRoutes } from './routes/courseRoutes';

dotenv.config();
const PORT = process.env.COURSES_SERVICE_PORT || 3002;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/courses', courseRoutes);

app.listen(PORT, () => {
  console.log(`Courses service running on http://localhost:${PORT}`);
});
