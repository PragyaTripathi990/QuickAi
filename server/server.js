import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import geminiResponse from './gemini.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('server is LIVE');
})
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
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
