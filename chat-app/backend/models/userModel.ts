import pool from "../config/db";

export function userModel() {

    interface CreateUserDTO {
        username: string;
        email: string;
        password: string;
        profilePic?: string;
        isAdmin?: boolean;
    }

    interface UpdateProfileDTO {
        username: string;
        email: string;
        password: string;
        profilePic?: string;
    }

    return {

        getAllUsers: async () => {

            const res = await pool.query(`
                SELECT
                    id,
                    username,
                    email,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
                FROM users
            `);

            return res.rows;
        },

        getById: async (id: number) => {

            const res = await pool.query(`
                SELECT
                    id,
                    username,
                    email,
                    password_hash,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
                FROM users
                WHERE id=$1
            `,[id]);

            return res.rows[0];
        },

        getByUsername: async (username: string) => {

            const res = await pool.query(`
                SELECT
                    id,
                    username,
                    email,
                    password_hash,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
                FROM users
                WHERE username=$1
            `,[username]);

            return res.rows[0];
        },

        getByEmail: async (email: string) => {

            const res = await pool.query(`
                SELECT
                    id,
                    username,
                    email,
                    password_hash,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
                FROM users
                WHERE email=$1
            `,[email]);

            return res.rows[0];
        },

        create: async (data: CreateUserDTO) => {

            const {
                username,
                email,
                password,
                profilePic,
                isAdmin
            } = data;

            const res = await pool.query(`
                INSERT INTO users (
                    username,
                    email,
                    password_hash,
                    profile_pic,
                    is_admin
                )
                VALUES ($1,$2,$3,$4,$5)
                RETURNING
                    id,
                    username,
                    email,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
            `,[
                username,
                email,
                password,
                profilePic,
                isAdmin
            ]);

            return res.rows[0];
        },

        update: async (
            id: number,
            data: UpdateProfileDTO
        ) => {

            const {
                username,
                email,
                password,
                profilePic
            } = data;

            const res = await pool.query(`
                UPDATE users
                SET
                    username=$1,
                    email=$2,
                    password_hash=$3,
                    profile_pic=$4
                WHERE id=$5
                RETURNING
                    id,
                    username,
                    email,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
            `,[
                username,
                email,
                password,
                profilePic,
                id
            ]);

            return res.rows[0];
        },

        delete: async (id:number) => {

            const res = await pool.query(`
                DELETE FROM users
                WHERE id=$1
                RETURNING
                    id,
                    username,
                    email,
                    profile_pic AS "profilePic",
                    is_admin AS "isAdmin",
                    created_at AS "createdAt"
            `,[id]);

            return res.rows[0];
        }
    }
}

const model = userModel();

export default model;