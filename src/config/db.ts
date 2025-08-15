import sql from 'mssql';

const dbConfig: sql.config = {
    user : 'sa',
    password : '1',
    database : 'Iroh',
    server : 'DESKTOP-9LJ7SMT',
    options : {
        encrypt : false,
        trustServerCertificate : false
    }
};

let pool: sql.ConnectionPool | null = null;


export async function getDbPool() {
    if (pool) {
        return pool;
    }
    try {
        pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        throw error;
    }
}

export { sql };