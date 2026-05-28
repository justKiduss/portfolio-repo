import pool from "../config/db"

function groupMembers_Model() {

    return {
        getAllGroupMembers: async (group_id: number) => {
            const res = await pool.query(`
                SELECT 
                    gm.id,
                    gm.group_id,
                    gm.user_id,
                    gm.joined_at,
                    u.username
                FROM public.group_members gm
                INNER JOIN public.users u ON gm.user_id = u.id
                WHERE gm.group_id = $1
            `, [group_id]);
            
            return res.rows;
        },
        searchGroupMembers: async (group_id: number, username: string) => {
            const searchQuery = `%${username}%`;

            const res = await pool.query(`
                SELECT 
                    gm.id,
                    gm.group_id,
                    gm.user_id,
                    gm.joined_at,
                    u.username
                FROM public.group_members gm
                INNER JOIN public.users u ON gm.user_id = u.id
                WHERE gm.group_id = $1 AND u.username ILIKE $2
            `, [group_id, searchQuery]); // $1 binds to group_id, $2 binds to searchQuery
            
            return res.rows;
        },
        addGroupMember: async (group_id: number, username: string) => {
            // 1. Find the user ID matching the username
            const userRes = await pool.query(`
                SELECT id FROM public.users 
                WHERE username = $1
            `, [username]);

            const user = userRes.rows[0];

            // If the username doesn't exist in your database, return null or throw an error
            if (!user) {
                return null; 
            }

            // 2. Insert the new member into the group_members table
            const res = await pool.query(`
                INSERT INTO public.group_members (group_id, user_id)
                VALUES ($1, $2)
                ON CONFLICT (group_id, user_id) DO NOTHING
                RETURNING id, group_id, user_id, joined_at
            `, [group_id, user.id]);

            return res.rows[0];
        },
        leaveGroup: async (group_id: number, user_id: number) => {
            const res = await pool.query(`
                DELETE FROM public.group_members
                WHERE group_id = $1 AND user_id = $2
                RETURNING id, group_id, user_id
            `, [group_id, user_id]);

            // Returns the deleted row if successful, or null if no match was found
            return res.rows[0] || null;
        },
        // Add this inside your groupMembers_Model return block
        checkExactMember: async (group_id: number, username: string) => {
            const res = await pool.query(`
                SELECT 1 
                FROM public.group_members gm
                INNER JOIN public.users u ON gm.user_id = u.id
                WHERE gm.group_id = $1 AND u.username = $2
                LIMIT 1
            `, [group_id, username]);
            
            return res.rows[0] || null; // Returns row if found, null if not
        }
    }
    
}

const model=groupMembers_Model();
export default model;
