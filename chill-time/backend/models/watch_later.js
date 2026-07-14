import pool from "../config/db.js";

export function watch_later(){
    return{
        getall:async(user_id)=>{
            const res=await pool.query("SELECT * FROM watch_later WHERE user_id = $1 ORDER BY updated_at DESC",[user_id]);
            return res.rows;
        },
        addMovie:async(data,user_id)=>{
            const {movieId,title,poster,type,timestamp}=data;
            const query=`INSERT INTO watch_later (user_id,movie_id,title,poster,type,timestamp) 
                    values ($1,$2,$3,$4) RETURNING *`;
            const values=[user_id,movieId,title,poster,type,timestamp];
            const res=await pool.query(query,values);
            return res.rows[0];
        }

    }
}

const watchLatermodel=watch_later();
export default watchLatermodel;