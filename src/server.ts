import express from 'express';
import { getDbPool } from './config/db';
import apiRouter from './routes'
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

app.use(express.json());
dotenv.config();


// todo: fonksiyonun içine alıcam. 
(async () => {
    try {
        await getDbPool();
        console.log('Database bağlandı.');
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
})();
app.get('/', (req,res) => {
    return res.json({
        message :`Server çalışıyor: port:${PORT}`
    })
});
app.use('/', apiRouter);
app.listen(PORT, () => {
  console.log(`Server çalışıyor: ${PORT}`);
});