export function Continue_watching(){
    return{
        getall:async(user_id)=>{
            const res=await pool.query("SELECT * FROM continue_watching WHERE user_id = $1 ORDER BY updated_at DESC",[user_id]);
            return res.rows;
        }    
    }
}