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
import cookieParser from "cookie-parser";
import continueRouter from "./routes/continueRoute.js";
import watchLaterRouter from "./routes/watchLater.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Normalize tracking variable safely
const env = (process.env.NODE_ENV || 'development').toLowerCase();
console.log("Current Mode:", env);

const app = express();
app.set("trust proxy", 1);

app.use(passport.initialize());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin:env!=="development" ?
    "https://movix.kidus.codes": "http://localhost:3000",
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
app.use('/api/continue',continueRouter);
app.use('/api/watchLater',watchLaterRouter);

// app.use(notFound);

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    res.status(status).json({
        success:false,
        status:status,
        msg:err.message || "something went wrong"
    })
})
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

// app.listen(port, () => {
//     console.log(`http://localhost:${port} connected successfully`);
// });

export default app;