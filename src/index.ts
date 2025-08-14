import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req,res) => {
    return res.json({
        message :`Server çalışıyor: port:${PORT}`
    })
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});