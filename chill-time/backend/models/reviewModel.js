import pool from "../config/db.js";
export function reviewModel(){

    return{
        getAll:async ()=>{
            const res=await pool.query('SELECT * FROM reviews');
            return res.rows;
        },
        getById:async (id)=>{
            const res=await pool.query(
                `SELECT * FROM reviews WHERE id = $1`, [id]
            );
            return res.rows[0];
        },
        countReviewsByMovieId:async (movie_id)=>{
            const res=await pool.query(
                `SELECT COUNT(*) FROM reviews WHERE movie_id= $1`,[movie_id]
            )
            return parseInt(res.rows[0].count);
        },
        getReviewsByMovieId:async (movie_id,limit,offSet)=>{
            const res=await pool.query(
                `SELECT * FROM reviews WHERE movie_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`,[movie_id, limit, offSet],
            );
            return res.rows;
        },
        create:async (data)=>{
            const {movie_id,movie_title,rating,review,user_id}=data;
            const query=`INSERT INTO reviews (movie_id,movie_title,rating,review,user_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;

            const values=[movie_id,movie_title,rating,review,user_id];
            const res=await pool.query(query,values);
            return res.rows[0];
        },
        update:async(id,data)=>{
            const {movie_id,movie_title,rating,review,user_id}=data;
            const query=`UPDATE reviews SET movie_id=$1, movie_title=$2, rating=$3, review=$4,updated_at=NOW() WHERE id=$5 AND user_id=$6 RETURNING *`;
            const values=[movie_id,movie_title,parseFloat(rating),review,id,user_id];
            const res=await pool.query(query,values);
            return res.rows[0];
        },
        delete:async(id,user_id)=>{
            const res=await pool.query(
                `DELETE FROM reviews WHERE id=$1 AND user_id=$2 RETURNING *`,[id,user_id]
            );
            return res.rows[0];
        }
    }
    

}

const model=reviewModel();

export default model;

