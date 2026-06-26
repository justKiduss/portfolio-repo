export function watch_later(){
    return{
        getall:async(user_id)=>{
            const res=await pool.query("SELECT * FROM watch_later WHERE user_id = $1 ORDER BY updated_at DESC",[user_id]);
            return res.rows;
        }    
    }
}