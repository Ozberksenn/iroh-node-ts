import pkg from 'pg';
const { Pool, types } = pkg;

// 🔥 KRİTİK SATIRLAR (TEK YER)
types.setTypeParser(1114, (val) => val); // timestamp WITHOUT time zone
types.setTypeParser(1184, (val) => val); // timestamptz (garanti)

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD, // ❗ fallback YOK
  database: process.env.DB_DATABASE || 'Iroh',
  ssl: false,
});

if (!process.env.DB_PASSWORD) {
  console.error('❌ DB_PASSWORD tanımlı değil!');
  process.exit(1);
}

export async function getDbPool() {
  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
}
