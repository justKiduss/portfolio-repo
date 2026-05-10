import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:process.env.NODE_ENV==="production" ? {
        rejectUnauthorized:false,
    } : false,
});

pool.on('connect',()=>{
    console.log("✅ PostgreSQL Connected Successfully to chat-app")
})

pool.on('error',(err)=>{
    console.log('❌ Unexpected error on idle client', err);
    process.exit(-1);
})

export default pool;

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database Time:', res.rows[0].now);
        console.log('connection is successful');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Connection not successful', err.message);
        } else {
            console.error('Connection not successful', err);
        }
    }
};
if (process.env.NODE_ENV === "development") {
    testConnection()
}


