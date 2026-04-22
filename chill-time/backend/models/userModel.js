import pool from "../config/db.js";
export function userModel(){
    return{
        getAll:async()=>{
            const res=await pool.query('SELECT id,username,email,avatar,role FROM users');
            return res.rows;
        },
        getById:async(id)=>{
            const res=await pool.query('SELECT * FROM users WHERE id= $1',[id]
            );
            return res.rows[0];
        },
        getByUsername:async(username)=>{
            const res=await pool.query(`SELECT * FROM users where username=$1`,[username]
            );
            return res.rows[0];
        },
        create:async(data)=>{
            const {username,email,password,avatar}=data;
            const res=await pool.query(`INSERT INTO users (username,email,password,avatar)
                VALUES ($1, $2, $3, $4) RETURNING *`,[username,email,password,avatar]
            );
            return res.rows[0];
        },
        getByEmail:async (email)=>{
            const res=await pool.query('SELECT * FROM users WHERE email=$1',[email]                
            );
            return res.rows[0];
        },
        update:async (id,data)=>{
            const {username,email,password,avatar}=data;
            const res=await pool.query(`UPDATE users SET username=$1, email=$2, password=$3, avatar=$4, updated_at=NOW() WHERE id=$5 RETURNING *`,
                [username,email,password,avatar,id]
            );
            return res.rows[0];
        },
        delete:async (id)=>{
            const res=await pool.query(
                `DELETE FROM users WHERE id=$1 RETURNING *`,[id]
            );
            return res.rows[0];
        }

    }
}

const model=userModel();
export default model;
