import express from "express";
import { createUser, deleteOwnAccount, deleteUser, getUser, getUsers, loginUser, updateUser } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";
import { protect } from "../middleware/protect.js";
import { authorized } from "../middleware/authorize.js";
import {validateUserUpdate} from "../middleware/validateUserUpdate.js"

import passport from "passport"; // 1. Import passport
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // 2. Import Strategy
import jwt from "jsonwebtoken"; // 3. Import JWT to generate tokens
import pool from "../config/db.js"; // Import your DB connection

const router=express.Router();


    // --- GOOGLE OAUTH STRATEGY ---
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://movix-twcp.onrender.com/api/user/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const name = profile.displayName;

            // Check if user exists in PostgreSQL
            let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

            if (user.rows.length === 0) {
                // If user doesn't exist, create them
                user = await pool.query(
                    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
                    [name, email, 'google-auth-no-password'] // Dummy password for Google users
                );
            }
            
            return done(null, user.rows[0]);
        } catch (err) {
            return done(err, null);
        }
    }
    ));

    // --- GOOGLE ROUTES ---

    // Initial call from frontend handleGoogleLogin
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Callback from Google
    router.get('/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login', session: false }),
        (req, res) => {
            // Generate a token for the user who just logged in
            const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            
            // Redirect back to your Vercel frontend with the token in the URL
            res.redirect(`https://movix-psi-seven.vercel.app?token=${token}`);
        }
    );
    router.get('/',protect,authorized('admin'),getUsers);

    router.post('/',validateUser, createUser);
    router.post('/login',loginUser);

    router.get('/:id',protect,getUser);
    router.put('/:id',protect,validateUserUpdate,updateUser);
    router.delete('/me',protect,deleteOwnAccount);
    router.delete('/:id',protect,authorized('admin'),deleteUser);


export default router;