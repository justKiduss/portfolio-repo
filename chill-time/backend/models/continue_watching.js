import pool from "../config/db.js";
export function Continue_watching(){
    return{
        getall:async(user_id)=>{
            const res=await pool.query("SELECT * FROM continue_watching WHERE user_id = $1 ORDER BY updated_at DESC",[user_id]);
            return res.rows;
        },
        addMovie:async(data)=>{
            const {user_id,movie_id,movie_title,poster_path}=data;
            const query=`INSERT INTO continue_watching (user_id,movie_id,movie_title,poster_path) 
                    values ($1,$2,$3,$4) RETURNING *`;
            const values=[user_id,movie_id,movie_title,poster_path];
            const res=await pool.query(query,values);
            return res.rows[0];
        }
    }
}

const model=Continue_watching();
export default model;