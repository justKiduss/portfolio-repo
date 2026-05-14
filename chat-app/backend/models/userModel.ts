import pool from "../config/db";
export function userModel(){
    interface CreateUserDTO {
        username: string;
        email: string;
        password: string;
        profilePic?: string;
        isAdmin?: boolean;
    }
    interface updateProfileDTO {
        username: string;
        email: string;
        password: string;
        profilePic?: string;
    }
    return{
        getAllUsers:async()=>{
            const res=await pool.query('SELECT * from users');
            return res.rows;
        },
        getById:async(id: number)=>{
            const res=await pool.query('SELECT * from users WHERE id=$1',[id]
            );
            return res.rows[0];
        },
        getByUsername:async(username: string)=>{
            const res=await pool.query('SELECT * from users WHERE username=$1',[username]);
            return res.rows[0];
        },
        create:async(data:CreateUserDTO)=>{
            const {username,email,password,profilePic,isAdmin}=data;
            const res=await pool.query(`INSERT INTO users (username,email,password,profilePic,isAdmin)
                VALUES ($1,$2,$3,$4,$5) RETURNING *`,[username,email,password,profilePic,isAdmin]
            );
            return res.rows[0];
        },
        getByEmail:async(email:string)=>{
            const res=await pool.query('SELECT * from users WHERE email=$1',[email]   
            );
            return res.rows[0];
        },
        update:async(id:number,data:updateProfileDTO)=>{
            const {username,email,password,profilePic}=data;
            const res=await pool.query(`UPDATE users SET username=$1,email=$2,password=$3,profilePic=$4,updated_at=NOW() WHERE id=$5 RETURNING *`,
                [username,email,password,profilePic,id]
            );
            return res.rows[0];
        },
        delete:async (id:number)=>{
            const res=await pool.query(`DELETE from users WHERE id=$1 RETURNING *`,[id]
            );
            return res.rows[0];
        }
    }
}

const model=userModel();
export default model;