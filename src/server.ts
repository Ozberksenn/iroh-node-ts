// import dotenv from "dotenv";
// dotenv.config();

// import express from 'express';
// import apiRouter from './routes';
// import { getDbPool } from './config/db';
// import cors from 'cors';
// import cookieParser from "cookie-parser";

// const app = express();
// const PORT = 3001;


// // CORS Ayarlarını sabitle
// const corsOptions = {
//     origin: function (origin:any, callback:any) {
//         // Postman veya server-to-server isteklerde origin undefined olabilir, buna izin ver
//         const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://playground-management.vercel.app'];
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200 // Bazı eski tarayıcılar/cihazlar için (opsiyonel ama iyi)
// };

// // Middleware sıralaması önemlidir, en üste koy
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Preflight istekleri için de aynı ayar

// app.use(express.json());
// app.use(cookieParser());

// async function connect(retries = 5, delay = 5000) {
//   for (let i = 0; i < retries; i++) {
//     try {
//       await getDbPool();
//       console.log('Database bağlandı.');
//       return;
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);

//       console.error(
//         `Database bağlantı hatası (deneme ${i + 1}/${retries}):`,
//         errorMessage
//       );

//       if (i < retries - 1) {
//         console.log(`${delay / 1000} saniye sonra tekrar denenecek...`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//       } else {
//         console.error('Database bağlantısı başarısız oldu. Uygulama kapatılıyor...');
//         process.exit(1);
//       }
//     }
//   }
// }

// connect();

// app.get('/', (_req, res) => {
//   res.json({
//     message: `Port çalışıyor: ${PORT}`
//   });
// });

// app.use('/', apiRouter);

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server çalışıyor: ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import apiRouter from './routes';
import { getDbPool } from './config/db';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://playground-management.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Postman / server-side request
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

// ⬇️ middleware sırası ÖNEMLİ
app.use(express.json());
app.use(cookieParser());

const PORT = 3001;

async function connect(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await getDbPool();
      console.log('Database bağlandı.');
      return;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.error(
        `Database bağlantı hatası (deneme ${i + 1}/${retries}):`,
        errorMessage
      );

      if (i < retries - 1) {
        console.log(`${delay / 1000} saniye sonra tekrar denenecek...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Database bağlantısı başarısız oldu. Uygulama kapatılıyor...');
        process.exit(1);
      }
    }
  }
}

connect();

app.get('/', (_req, res) => {
  res.json({
    message: `Port çalışıyor: ${PORT}`
  });
});

app.use('/', apiRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server çalışıyor: ${PORT}`);
});
