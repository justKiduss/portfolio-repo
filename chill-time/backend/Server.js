import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/notFound.js";
import helmet from "helmet"; // this is for security like it 
                //prevents these attacks
                // Key Header: Content-Security-Policy (limits where resources can be loaded from).
                // Key Header: X-Frame-Options (prevents Clickjacking).
                // Key Header: X-Content-Type-Options (prevents MIME-sniffing).
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";

dotenv.config();

// https://chill-time-three.vercel.app

const port=process.env.PORT || 3000;
const app=express();

app.use(helmet());
app.use(cors({
  origin: "https://chill-time-three.vercel.app", 
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);
const limiter =rateLimit({
    windowMs:15 * 60 * 1000,
    max:100,
    standardHeaders:true,
    legacyHeaders:false
})
const authLimiter=rateLimit({
    windowMs:60 *60*1000,
    max:5,
    message:{
        success:false,
        message:"too many login attempts, please try again in an hour"
    },
    standardHeaders:true,
    legacyHeaders:false
})
// this apply for login route only
app.use("/api/user/login",authLimiter);

app.use("/api",limiter);
// routes
app.use("/api/reviews",reviewRoutes);

app.use('/api/user',router);
// middleware
app.use(notFound);
// error handling
app.use(errorHandler);

app.listen(port,()=>{
 console.log(`http://localhost:${port} connected successfull`);
})

export default app;