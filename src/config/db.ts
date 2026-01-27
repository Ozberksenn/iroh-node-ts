import pkg from 'pg';
const { Pool, types } = pkg;

// timestamp parser'lar ✔️
types.setTypeParser(1114, (val) => val);
types.setTypeParser(1184, (val) => val);

export const pool = new Pool({
  host: process.env.DB_HOST,          
  port: Number(process.env.DB_PORT),  
  user: process.env.DB_USER,          
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_DATABASE, 
  ssl: false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

if (!process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  console.error('❌ DB env değişkenleri eksik!');
  process.exit(1);
}

export async function getDbPool() {
  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
}
