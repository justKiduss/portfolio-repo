import pg from "pg";
import dotenv from 'dotenv';

// This line reads your .env file and attaches the variables to process.env
dotenv.config();

const {Pool} =pg;

const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
});

pool.on('connect',()=>{
    console.log('✅ PostgreSQL Connected Successfully to Movie-Site');
})

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;


// Temporary Test Logic
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database Time:', res.rows[0].now);
        console.log('connection is successful');
    } catch (err) {
        console.error('Connection not successful', err.message);
    }
};
if (process.env.NODE_ENV !== "test") {
    testConnection()
}