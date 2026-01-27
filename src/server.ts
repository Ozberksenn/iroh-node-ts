
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import apiRouter from './routes'
import { getDbPool } from './config/db';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();

// 'http://localhost:3000','http://localhost:5173'
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:5173','https://playground-management.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization',],
    credentials:true
  }));
const PORT = 3001;
app.use(express.json());
app.use(cookieParser()); // cookie refresh token için
async function connect(retries = 5, delay = 5000){
    for (let i = 0; i < retries; i++) {
        try {
            await getDbPool();
            console.log('Database bağlandı.');
            return;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Database bağlantı hatası (deneme ${i + 1}/${retries}):`, errorMessage);
            if (i < retries - 1) {
                console.log(`${delay/1000} saniye sonra tekrar denenecek...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error('Database bağlantısı başarısız oldu. Uygulama kapatılıyor...');
                process.exit(1);
            }
        }
    }
}
connect(); // database bağlantısı

app.get('/', (req,res) => {
    return res.json({
        message :`Port calisti: port:${PORT}`
    })
});

app.use('/' ,apiRouter);
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server çalışıyor: ${PORT}`);
});

// deneme 