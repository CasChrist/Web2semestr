import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { lessonRoutes } from './routes/lessonRoutes';

dotenv.config();
const PORT = process.env.LESSON_SERVICE_PORT || 3006;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
  console.log(`Lesson service running on http://localhost:${PORT}`);
});
