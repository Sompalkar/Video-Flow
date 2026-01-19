
import express from 'express'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import { connectMongo } from './db/mongo.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import projectRoutes from './routes/project.routes.js'


const app = express()


app.use(express.json())

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))


connectMongo()
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)



app.listen(8000, () => {
    if (!process.env.JWT_SECRET) {
        console.error('FATAL: JWT_SECRET is not defined in environment variables.');
        process.exit(1);
    }
    console.log('Server started on port 8000')
})