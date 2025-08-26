import express from 'express';
import { getDbPool } from './config/db';
import apiRouter from './routes'
import dotenv from "dotenv";
import cors from 'cors';
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
const PORT = 3000;
app.use(express.json());
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
        message :`Server çalışıyor: port:${PORT}`
    })
});
app.use('/', apiRouter);
app.listen(PORT, () => {
  console.log(`Server çalışıyor: ${PORT}`);
});