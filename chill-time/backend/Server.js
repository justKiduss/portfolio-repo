// import express from "express";
// import cors from "cors";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import { errorHandler } from "./middleware/errorMiddleware.js";
// import { notFound } from "./middleware/notFound.js";
// import helmet from "helmet"; // this is for security like it 
//                 //prevents these attacks
//                 // Key Header: Content-Security-Policy (limits where resources can be loaded from).
//                 // Key Header: X-Frame-Options (prevents Clickjacking).
//                 // Key Header: X-Content-Type-Options (prevents MIME-sniffing).
// import rateLimit from "express-rate-limit";
// import dotenv from "dotenv";
// import router from "./routes/userRoutes.js";
// import { requestLogger } from "./middleware/requestLogger.js";
// import passport from 'passport';

// dotenv.config();

// // https://chill-time-three.vercel.app

// const port=process.env.PORT || 3000;
// console.log(process.env.NODE_ENV)
// const app=express();
// app.set("trust proxy", 1);

// app.use(passport.initialize());
// app.use(helmet());
// app.use(cors({
//   origin: "https://movix-psi-seven.vercel.app", 
//   methods: ["GET", "POST","PUT","PATCH", "DELETE"],
//   credentials: true
// }));
// app.use(express.json());
// app.use(requestLogger);
// const limiter =rateLimit({
//     windowMs:15 * 60 * 1000,
//     max:100,
//     standardHeaders:true,
//     legacyHeaders:false
// })
// const authLimiter=rateLimit({
//     windowMs:60 *60*1000,
//     max:5,
//     message:{
//         success:false,
//         message:"too many login attempts, please try again in an hour"
//     },
//     standardHeaders:true,
//     legacyHeaders:false
// })

// app.get("/", (req, res) => {
//     res.send("API running");
// });

// // this apply for login route only
// app.use("/api/user/login",authLimiter);

// app.use("/api",limiter);
// // routes
// app.use("/api/reviews",reviewRoutes);

// app.use('/api/user',router);

// // middleware
// app.use(notFound);
// // error handling
// app.use(errorHandler);


// const testConnection = async () => {
//     try {
//         const res = await pool.query('SELECT NOW()');
//         console.log('Database Time:', res.rows[0].now);
//         console.log('connection is successful');
//     } catch (err) {
//         console.error('Connection not successful', err.message);
//     }
// };
// if (process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT") {
//     testConnection()
// }

// app.listen(port,()=>{
//  console.log(`http://localhost:${port} connected successfull`);
// })
 
// export default app;



import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/notFound.js";
import helmet from "helmet"; 
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import passport from 'passport';
// 1. ADD THIS IMPORT RIGHT HERE
import pool from "./config/db.js"; 

dotenv.config();

const port = process.env.PORT || 3000;

// Normalize tracking variable safely
const env = (process.env.NODE_ENV || 'development').toLowerCase();
console.log("Current Mode:", env);

const app = express();
app.set("trust proxy", 1);

app.use(passport.initialize());
app.use(helmet());
app.use(cors({
  origin: "https://movix-psi-seven.vercel.app", 
  methods: ["GET", "POST","PUT","PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "too many login attempts, please try again in an hour"
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.get("/", (req, res) => {
    res.send("API running");
});

app.use("/api/user/login", authLimiter);
app.use("/api", limiter);
app.use("/api/reviews", reviewRoutes);
app.use('/api/user', router);

app.use(notFound);
app.use(errorHandler);

// 2. FIXED: Uses the imported pool variable safely now
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database Time:', res.rows[0].now);
        console.log('⚡ Database connection is successful');
    } catch (err) {
        console.error('❌ Connection not successful:', err.message);
    }
};

// Fixed to lowercase matching
if (env === "development" || env === "test") {
    testConnection();
}

app.listen(port, () => {
    console.log(`http://localhost:${port} connected successfully`);
});

export default app;