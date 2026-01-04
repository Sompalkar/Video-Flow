
import express from 'express'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import {connectMongo} from './db/mongo.js'


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



app.listen(8000, () => {
    console.log('Server started on port 8000')
})