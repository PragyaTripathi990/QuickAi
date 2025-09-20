import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import geminiResponse from './gemini.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('server is LIVE');
})

const PORT = process.env.PORT || 8000;
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.get('/', async (req, res) => {
    let prompt = req.query.prompt;
    await geminiResponse(prompt)
})
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
