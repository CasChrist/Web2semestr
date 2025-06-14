import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../../src/config/db';
import { enrollmentRoutes } from './routes/enrollmentRoutes';

dotenv.config();
const PORT = process.env.ENROLLMENT_SERVICE_PORT || 3004;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/enrollments', enrollmentRoutes);

app.listen(PORT, () => {
  console.log(`Enrollment service running on http://localhost:${PORT}`);
});
