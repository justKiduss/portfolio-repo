import pool from "../config/db";

const messageModel = () => {
    // 🚀 Upgraded with voice and video properties
    interface CreateMessageDTO {
        text?: string | null;
        image?: string | null;
        voice?: string | null;
        video?: string | null;
    }
    
    interface updateMessage {
        text?: string | null;
        image?: string | null;
        voice?: string | null;
        video?: string | null;
    }

    return {
        getAllMessages: async () => {
            const res = await pool.query('SELECT * from message');
            return res.rows;
        },
        
        getById: async (id: number) => {
            const res = await pool.query(`SELECT * from message WHERE id=$1`, [id]);
            return res.rows[0];
        },
        
        create: async (senderId: number, receiverId: number, data: CreateMessageDTO) => {
            // 🚀 Destructured voice and video links
            const { text, image, voice, video } = data;
    
            // 🚀 Added voice and video to columns list, values index ($5, $6), and the RETURNING statement
            const res = await pool.query(
                `INSERT INTO message (sender_id, receiver_id, text, image, voice, video) 
                 VALUES ($1, $2, $3, $4, $5, $6) 
                 RETURNING 
                    id,
                    sender_id AS "senderId",
                    receiver_id AS "receiverId",
                    text,
                    image,
                    voice,
                    video,
                    created_at AS "createdAt"`,
                [senderId, receiverId, text || null, image || null, voice || null, video || null]
            );
            return res.rows[0];
        },
        
        update: async (id: number, data: updateMessage) => {
            const { text, image, voice, video } = data;
            
            // 🚀 Updated SQL template query string to modify all parameters dynamically
            const res = await pool.query(
                `UPDATE message 
                 SET text=$1, image=$2, voice=$3, video=$4 
                 WHERE id=$5 
                 RETURNING *`,
                [text || null, image || null, voice || null, video || null, id]
            );
            return res.rows[0];
        },
        
        delete: async (id: number, userId: number) => {
            const res = await pool.query(
                'DELETE from message WHERE id=$1 AND sender_id=$2 RETURNING *',
                [id, userId]
            );
            return res.rows[0];
        },
        
        getConversationMessages: async (senderId: number, receiverId: number) => {
            const res = await pool.query(
                `SELECT * from message WHERE 
                    (sender_id=$1 AND receiver_id=$2)
                    or (receiver_id=$1 AND sender_id=$2) 
                 ORDER BY created_at ASC`,
                [senderId, receiverId]
            );
            return res.rows;
        },
        
        getInteractedUsers: async (userId: number) => {
            const query = `
                WITH conversation_partners AS (
                    SELECT DISTINCT CASE 
                        WHEN sender_id = $1 THEN receiver_id
                        ELSE sender_id
                    END as partner_id
                    FROM message
                    WHERE sender_id = $1 OR receiver_id = $1
                )
                SELECT u.id, u.username, u.email
                FROM users u
                JOIN conversation_partners cp ON u.id = cp.partner_id;
            `;
            const res = await pool.query(query, [userId]);
            return res.rows;
        }
    };
};

const model = messageModel();
export default model;