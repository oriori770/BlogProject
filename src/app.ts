import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './services/database';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import cookieParser  from "cookie-parser"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


connectToDatabase();
app.get("/", (req, res) => {
    const mesg = "wellcome app loaded from database ";
     res.send({mesg});
     console.log(mesg)});

app.use('/auth', authRoutes);
app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})