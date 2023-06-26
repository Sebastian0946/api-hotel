import express from 'express'
import morgan from 'morgan'
import cors from  'cors'

import routes from './routes';


const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.use("/api", routes)

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app