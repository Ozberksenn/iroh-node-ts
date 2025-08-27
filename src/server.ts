import express from 'express';
import { getDbPool } from './config/db';
import apiRouter from './routes'
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
const PORT = 3000;
app.use(express.json());
app.use(cookieParser()); // cookie refresh token için
dotenv.config();
async function connect(){
 try {
        await getDbPool();
        console.log('Database bağlandı.');
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
}
connect(); // database bağlantısı



app.get('/', (req,res) => {
    return res.json({
        message :`Port calisti: port:${PORT}`
    })
});
app.use('/', apiRouter);
app.listen(PORT, () => {
  console.log(`Server çalışıyor: ${PORT}`);
});