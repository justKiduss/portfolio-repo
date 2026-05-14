import pool from "../config/db";
const messageModel=()=>{
    interface CreateMessageDTO {
        senderId: number;
        receiverId: number;
        text: string;
        image?: string;
    }
    interface updateMessage{
        text:string;
        image?:string;
    }
    return{
        getAllMessages:async()=>{
            const res=await pool.query('SELECT * from message');
            return res.rows;
        },
        getById:async(id:number)=>{
            const res=await pool.query(`SELECT * from message WHERE id=$1`,[id]);
            return res.rows[0];
        },
        create:async(data:CreateMessageDTO)=>{
            const {senderId,receiverId,text,image}=data;
            const res=await pool.query(`INSERT INTO message (senderId,receiverId,text,image) VALUES ($1,$2,$3,$4) RETURNING *`,
                [senderId,receiverId,text,image]);
            return res.rows[0];
        },
        update:async(id:number,data:updateMessage)=>{
            const {text,image}=data;
            const res=await pool.query(`UPDATE message SET text=$1,image=$2 where id=$3 RETURNING *`,
                [text,image,id]
            );
            return res.rows[0];
        },
        delete:async(id:number)=>{
            const res=await pool.query('DELETE from message WHERE id=$1 RETURNING *',[id]
            );
            return res.rows[0];
        },
        getMessagesByUserId:async(userId:number)=>{
            const res=await pool.query(`SELECT * from message WHERE senderId=$1 or receiverId=$1`,[userId]
            )
            return res.rows
        },
        getConversationMessages:async(senderId:number,receiverId:number)=>{
            const res=await pool.query(`SELECT * from message WHERE 
                (senderId=$1 AND receiverId=$2)
                or (receiverId=$1 AND senderId=$2) ORDER BY created_at ASC`,[senderId,receiverId])
                return res.rows;
        }
    }
}

const model=messageModel();
export default model;
