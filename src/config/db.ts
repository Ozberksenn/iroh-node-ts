import sql from 'mssql';

const dbConfig: sql.config = {
  user: 'sa',
  password: '1',
  database: 'Iroh',
  server: '127.0.0.1', // 🔥 LOTUS-HP1 kullanma
  port: 1433,
  options: {
    encrypt: true,               // 🔥 SSMS'te ZORUNLU
    trustServerCertificate: true // 🔥 SSMS'te işaretli
  }
};

export async function getDbPool() {
  return sql.connect(dbConfig);
}
