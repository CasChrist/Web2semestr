import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../../src/config/db';
import { commentRoutes } from './routes/commentRoutes';

dotenv.config();
const PORT = process.env.COMMENT_SERVICE_PORT || 3005;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Comment service running on http://localhost:${PORT}`);
});
