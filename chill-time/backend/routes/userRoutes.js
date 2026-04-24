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
import model from "../models/userModel.js"; // Import your existing model
import { generateToken } from "../utilis/generate.js";
const router=express.Router();

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://movix-twcp.onrender.com/api/user/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            
            // 1. Check if user exists using your existing model
            let user = await model.getByEmail(email);

            if (!user) {
                // 2. Prepare data to satisfy your existing model.create requirements
                const newUser = {
                    username: email.split('@')[0] + Math.floor(Math.random() * 1000), // satisfies NOT NULL
                    email: email,
                    password: "google-auth-protected", // satisfies NOT NULL
                    avatar: profile.photos[0]?.value || null
                };

                // 3. Use your existing model to save the user
                user = await model.create(newUser);
            }
            
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
    ));

    // Google Callback Route
    router.get('/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login', session: false }),
        (req, res) => {
            // 4. Use your existing generateToken utility
            const token = generateToken(req.user.id); 
            
            // Redirect back to Vercel
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