import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { userRoutes } from './routes/userRoutes';

dotenv.config();
const PORT = process.env.USER_SERVICE_PORT || 3001;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`);
});
