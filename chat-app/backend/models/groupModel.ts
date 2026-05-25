import pool from "../config/db";
interface createGroupDTO {
    group_name:string,
    group_admin:number,
    group_profile_pic:string,
}

interface updateGroupDTO {
    group_id?:number,
    group_name?:string,
    group_admin?:number,
    group_profile_pic?:string,
    created_at?:Date
}

export const groupModel=()=>{
    
    return{
        getAllGroups:async ()=>{
            const res=await pool.query(`
                SELECT group_id,group_name,group_admin,group_profile_pic,created_at FROM "group"
                `);
                return res.rows;
        },

        getGroupsById:async (group_id:number)=>{
            const res=await pool.query(`
                SELECT group_id,group_name,group_admin,group_profile_pic,created_at FROM "group"
                WHERE group_id=$1
                `,[group_id]);
                return res.rows[0] || null;
        },

        getByGroupName:async(group_name:string)=>{
            const res=await pool.query(`
                SELECT group_id,group_name,group_admin,group_profile_pic,created_at FROM "group"
                WHERE group_name=$1
                `,[group_name]);
                return res.rows[0] || null;
        },

        create:async(data:createGroupDTO)=>{
            const {group_name,group_admin,group_profile_pic}=data;
            
            const finalPic = group_profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(group_name)}`;

            const res=await pool.query(`
                INSERT INTO "group" (
                group_name,
                group_admin,
                group_profile_pic,
                )
                VALUES ($1,$2,$3) 
                RETURNING 
                    group_id,
                    group_name,
                    group_admin,
                    group_profile_pic,
                    created_at
                `,[
                    group_name,
                    group_admin,
                    group_profile_pic,
                ]);
                return res.rows[0];
        },

        delete:async (group_id:number)=>{
            const res=await pool.query(`
                DELETE FROM "group"
                WHERE group_id=$1 
                RETURNING
                    group_id,
                    group_name,
                    group_admin,
                    group_profile_pic,
                    created_at
                    `,[group_id]);
                    return res.rows[0] || null ;
        }

    }
}

const model=groupModel();
export default model;