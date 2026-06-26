import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const env = (process.env.NODE_ENV || 'development').toLowerCase();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Checks correctly against normalized lowercase string
    ssl: env === "production" ? {
        rejectUnauthorized: false,
    } : false
});

pool.on('connect', () => {
    console.log('✅ PostgreSQL Connected Successfully to Movie-Site');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;