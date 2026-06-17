import pool from "../config/db";

const groupMessageModel = () => {
    interface sendMessageDTO {
        text?: string | null;
        image?: string | null;
        video?: string | null;
        voice?: string | null;
    }
    interface updateMessageDTO {
        text?: string | null;
        image?: string | null;
        video?: string | null;
        voice?: string | null;
    }

    return {
        checkMessageOwnership: async (message_id: number, user_id: number): Promise<boolean> => {
            const res = await pool.query(`
                SELECT 1 
                FROM "groupMessage"
                WHERE id = $1 AND sender_id = $2
                LIMIT 1
            `, [message_id, user_id]);

            return res?.rows.length > 0;
        },
        getGroupMessages: async (group_id: number, user_id: number) => {
            const res = await pool.query(`
                SELECT gm.id, gm.sender_id, gm.group_id, gm.text, gm.image, gm.video, gm.voice, gm.created_at,
                u.username,u.profile_pic
                FROM "groupMessage" gm
                INNER JOIN group_members m ON gm.group_id = m.group_id
                INNER JOIN users u ON gm.sender_id = u.id
                WHERE gm.group_id = $1 AND m.user_id = $2
                ORDER BY gm.created_at ASC
            `, [group_id, user_id]);
            return res.rows;
        },
        getById: async (id: number) => {
            const res = await pool.query(`
                SELECT * FROM "groupMessage" WHERE id = $1
            `, [id]);
            return res.rows[0];
        },
        create: async (sender_id: number, group_id: number, data: sendMessageDTO) => {
            const { text, image, video, voice } = data;

            const res = await pool.query(`
                INSERT INTO "groupMessage" (sender_id, group_id, text, image, voice, video) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING id, sender_id, group_id, text, image, video, voice, created_at
            `, [sender_id, group_id, text, image, voice, video]);

            return res.rows[0];
        },
        update: async (id: number, data: updateMessageDTO) => {
            const { text, image, video, voice } = data;
            const res = await pool.query(`
                UPDATE "groupMessage" 
                SET text = $1, image = $2, video = $3, voice = $4 
                WHERE id = $5 
                RETURNING *
            `, [text, image, video, voice, id]);
            return res.rows[0];
        },
        delete: async (id: number) => {
            const res = await pool.query(`
                DELETE FROM "groupMessage" 
                WHERE id = $1 
                RETURNING *
            `, [id]);
            return res.rows[0] || null; 
        }
    };
};

const groupMessModel = groupMessageModel();
export default groupMessModel;