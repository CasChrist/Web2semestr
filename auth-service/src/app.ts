import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { authRoutes } from './routes/authRoutes';

dotenv.config();
const PORT = process.env.AUTH_SERVICE_PORT || 3003;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
