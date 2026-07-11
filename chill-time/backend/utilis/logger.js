// import winston from "winston";

// export const logger=winston.createLogger({
//     level:"info",
//     format:winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//     ),
//     transports:[
//         new winston.transports.Console(),
//         new winston.transports.File({filename:'logs/error.log',level:"error"}),
//         new winston.transports.File({filename: 'logs/combined.log'})
//     ]
// });


Claude finished the response
i redeployed it and this 404 https://movix-backend-ashen.vercel.app/
Request Method
GET
Status Code
404 Not Found
Remote Address
216.198.79.3:443
Referrer Policy
strict-origin-when-cross-origin  // import express from "express";

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
import cookieParser from "cookie-parser";
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
//     console.log(http://localhost:${port} connected successfully);
// });
export default app; then i removed index.js  Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 2 cores, 8 GB
Cloning github.com/justKiduss/portfolio-repo (Branch: main, Commit: 28412b9)
Previous build caches not available.
Cloning completed: 865.000ms
Running "vercel build"
Vercel CLI 55.0.0
Build Completed in /vercel/output [127ms]
Deploying outputs...
Deployment completed
Creating build cache...
Skipping cache upload because no files were prepared

[
  {
    "type": "staticAssets",
    "artefacts": [
      {
        "path": "/config/db.js",
        "type": "JS",
        "size": 604
      },
      {
        "path": "/controllers/reviewController.js",
        "type": "JS",
        "size": 3250
      },
      {
        "path": "/controllers/userController.js",
        "type": "JS",
        "size": 4473
      },
      {
        "path": "/middleware/AppError.js",
        "type": "JS",
        "size": 215
      },
      {
        "path": "/middleware/authorize.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/middleware/errorMiddleware.js",
        "type": "JS",
        "size": 600
      },
      {
        "path": "/middleware/notFound.js",
        "type": "JS",
        "size": 141
      },
      {
        "path": "/middleware/protect.js",
        "type": "JS",
        "size": 519
      },
      {
        "path": "/middleware/requestLogger.js",
        "type": "JS",
        "size": 220
      },
      {
        "path": "/middleware/validateId.js",
        "type": "JS",
        "size": 223
      },
      {
        "path": "/middleware/validateMovieId.js",
        "type": "JS",
        "size": 258
      },
      {
        "path": "/middleware/validateReview.js",
        "type": "JS",
        "size": 2040
      },
      {
        "path": "/middleware/validateUser.js",
        "type": "JS",
        "size": 572
      },
      {
        "path": "/middleware/validateUserUpdate.js",
        "type": "JS",
        "size": 443
      },
      {
        "path": "/models/continue_watching.js",
        "type": "JS",
        "size": 768
      },
      {
        "path": "/models/reviewModel.js",
        "type": "JS",
        "size": 2985
      },
      {
        "path": "/models/userModel.js",
        "type": "JS",
        "size": 1846
      },
      {
        "path": "/models/watch_later.js",
        "type": "JS",
        "size": 746
      },
      {
        "path": "/routes/reviewRoutes.js",
        "type": "JS",
        "size": 1050
      },
      {
        "path": "/routes/userRoutes.js",
        "type": "JS",
        "size": 3020
      },
      {
        "path": "/server.js",
        "type": "JS",
        "size": 5187
      },
      {
        "path": "/services/_tests_/reviewService.test.js",
        "type": "JS",
        "size": 1402
      },
      {
        "path": "/services/continueWatching.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/services/reviewService.js",
        "type": "JS",
        "size": 4178
      },
      {
        "path": "/services/userService.js",
        "type": "JS",
        "size": 3541
      },
      {
        "path": "/services/watchLater.js",
        "type": "JS",
        "size": 499
      },
      {
        "path": "/utilis/asyncHandler.js",
        "type": "JS",
        "size": 126
      },
      {
        "path": "/utilis/generate.js",
        "type": "JS",
        "size": 228
      },
      {
        "path": "/utilis/logger.js",
        "type": "JS",
        "size": 418
      }
    ]
  }
] [
  {
    "type": "staticAssets",
    "artefacts": [
      {
        "path": "/config/db.js",
        "type": "JS",
        "size": 604
      },
      {
        "path": "/controllers/reviewController.js",
        "type": "JS",
        "size": 3250
      },
      {
        "path": "/controllers/userController.js",
        "type": "JS",
        "size": 4473
      },
      {
        "path": "/middleware/AppError.js",
        "type": "JS",
        "size": 215
      },
      {
        "path": "/middleware/authorize.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/middleware/errorMiddleware.js",
        "type": "JS",
        "size": 600
      },
      {
        "path": "/middleware/notFound.js",
        "type": "JS",
        "size": 141
      },
      {
        "path": "/middleware/protect.js",
        "type": "JS",
        "size": 519
      },
      {
        "path": "/middleware/requestLogger.js",
        "type": "JS",
        "size": 220
      },
      {
        "path": "/middleware/validateId.js",
        "type": "JS",
        "size": 223
      },
      {
        "path": "/middleware/validateMovieId.js",
        "type": "JS",
        "size": 258
      },
      {
        "path": "/middleware/validateReview.js",
        "type": "JS",
        "size": 2040
      },
      {
        "path": "/middleware/validateUser.js",
        "type": "JS",
        "size": 572
      },
      {
        "path": "/middleware/validateUserUpdate.js",
        "type": "JS",
        "size": 443
      },
      {
        "path": "/models/continue_watching.js",
        "type": "JS",
        "size": 768
      },
      {
        "path": "/models/reviewModel.js",
        "type": "JS",
        "size": 2985
      },
      {
        "path": "/models/userModel.js",
        "type": "JS",
        "size": 1846
      },
      {
        "path": "/models/watch_later.js",
        "type": "JS",
        "size": 746
      },
      {
        "path": "/routes/reviewRoutes.js",
        "type": "JS",
        "size": 1050
      },
      {
        "path": "/routes/userRoutes.js",
        "type": "JS",
        "size": 3020
      },
      {
        "path": "/server.js",
        "type": "JS",
        "size": 5187
      },
      {
        "path": "/services/_tests_/reviewService.test.js",
        "type": "JS",
        "size": 1402
      },
      {
        "path": "/services/continueWatching.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/services/reviewService.js",
        "type": "JS",
        "size": 4178
      },
      {
        "path": "/services/userService.js",
        "type": "JS",
        "size": 3541
      },
      {
        "path": "/services/watchLater.js",
        "type": "JS",
        "size": 499
      },
      {
        "path": "/utilis/asyncHandler.js",
        "type": "JS",
        "size": 126
      },
      {
        "path": "/utilis/generate.js",
        "type": "JS",
        "size": 228
      },
      {
        "path": "/utilis/logger.js",
        "type": "JS",
        "size": 418
      }
    ]
  }
] [
  {
    "type": "staticAssets",
    "artefacts": [
      {
        "path": "/config/db.js",
        "type": "JS",
        "size": 604
      },
      {
        "path": "/controllers/reviewController.js",
        "type": "JS",
        "size": 3250
      },
      {
        "path": "/controllers/userController.js",
        "type": "JS",
        "size": 4473
      },
      {
        "path": "/middleware/AppError.js",
        "type": "JS",
        "size": 215
      },
      {
        "path": "/middleware/authorize.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/middleware/errorMiddleware.js",
        "type": "JS",
        "size": 600
      },
      {
        "path": "/middleware/notFound.js",
        "type": "JS",
        "size": 141
      },
      {
        "path": "/middleware/protect.js",
        "type": "JS",
        "size": 519
      },
      {
        "path": "/middleware/requestLogger.js",
        "type": "JS",
        "size": 220
      },
      {
        "path": "/middleware/validateId.js",
        "type": "JS",
        "size": 223
      },
      {
        "path": "/middleware/validateMovieId.js",
        "type": "JS",
        "size": 258
      },
      {
        "path": "/middleware/validateReview.js",
        "type": "JS",
        "size": 2040
      },
      {
        "path": "/middleware/validateUser.js",
        "type": "JS",
        "size": 572
      },
      {
        "path": "/middleware/validateUserUpdate.js",
        "type": "JS",
        "size": 443
      },
      {
        "path": "/models/continue_watching.js",
        "type": "JS",
        "size": 768
      },
      {
        "path": "/models/reviewModel.js",
        "type": "JS",
        "size": 2985
      },
      {
        "path": "/models/userModel.js",
        "type": "JS",
        "size": 1846
      },
      {
        "path": "/models/watch_later.js",
        "type": "JS",
        "size": 746
      },
      {
        "path": "/routes/reviewRoutes.js",
        "type": "JS",
        "size": 1050
      },
      {
        "path": "/routes/userRoutes.js",
        "type": "JS",
        "size": 3020
      },
      {
        "path": "/server.js",
        "type": "JS",
        "size": 5187
      },
      {
        "path": "/services/_tests_/reviewService.test.js",
        "type": "JS",
        "size": 1402
      },
      {
        "path": "/services/continueWatching.js",
        "type": "JS",
        "size": 501
      },
      {
        "path": "/services/reviewService.js",
        "type": "JS",
        "size": 4178
      },
      {
        "path": "/services/userService.js",
        "type": "JS",
        "size": 3541
      },
      {
        "path": "/services/watchLater.js",
        "type": "JS",
        "size": 499
      },
      {
        "path": "/utilis/asyncHandler.js",
        "type": "JS",
        "size": 126
      },
      {
        "path": "/utilis/generate.js",
        "type": "JS",
        "size": 228
      },
      {
        "path": "/utilis/logger.js",
        "type": "JS",
        "size": 418
      }
    ]
  }
] /middleware/requestLogger.js
220 B 
/middleware/validateId.js
223 B 
/middleware/validateMovieId.js
258 B 
/middleware/validateReview.js
2.04 kB
/middleware/validateUser.js
572 B 
/middleware/validateUserUpdate.js
443 B 
/models/continue_watching.js
768 B 
/models/reviewModel.js
2.99 kB
/models/userModel.js
1.85 kB
/models/watch_later.js
746 B 
/routes/reviewRoutes.js
1.05 kB
/routes/userRoutes.js
3.02 kB
/server.js
5.19 kB
/services/_tests_/reviewService.test.js
1.4 kB
/services/continueWatching.js
501 B 
/services/reviewService.js
4.18 kB
/services/userService.js
3.54 kB
/services/watchLater.js
499 B 
/utilis/asyncHandler.js
126 B 
/utilis/generate.js
228 B 
/utilis/logger.js

Show more

Diagnosed misconfigured root directory preventing Node.js deployment
Diagnosed misconfigured root directory preventing Node.js deployment
The build log gives it away explicitly this time: "type": "staticAssets" — Vercel is still not detecting a Node project at all, and critically, package.json doesn't appear anywhere in that file list. Every other file (server.js, controllers/, routes/, etc.) is listed, but no package.json. That's the actual smoking gun.

If Vercel can't find package.json in the directory it's building from, it has no way to know this is a Node project — no dependencies get installed, nothing gets detected as Express, and it just publishes every .js file as a static asset (which is exactly why hitting a route serves raw source code / 404s).

This means one of two things is true:

package.json isn't actually committed to your GitHub repo in this backend folder (easy to check: open the repo on github.com and look).
Root Directory is still not set correctly — it's pointing at a level where package.json isn't visible.
Can you do two things and tell me what you find:

Open github.com/justKiduss/portfolio-repo in your browser and navigate to wherever server.js lives. Confirm: is package.json sitting in that exact same folder?
Go back to Vercel → movix-backend project → Settings → Build and Deployment → Root Directory, and tell me exactly what's typed in that field right now (not the help text — the actual value, even if it's blank).
One of those two will be wrong, and once we know which, this is a one-line fix. Given how much back-and-forth this has taken through UI settings, if you want a faster and more reliable path: connecting Claude Code to your repo would let it directly inspect your folder structure, package.json location, and current Vercel config in one pass rather than us going screenshot-by-screenshot.

Recommended apps and extensions
Browse all
Claude Code for desktop
Claude Code could inspect your repo's actual file structure and package.json location directly, instead of us checking screenshots back and forth.
Screenshot 2026-07-12 010140.png
[Root Directory](https://vercel.com/kidusteshome036-7841s-projects/movix-backend/settings/build-and-deployment#root-directory)
The directory within your project, where your code is located. Leave this field empty if your code is not located in a subdirectory.
Include files outside the root directory in the [Build Step](https://vercel.com/docs/deployments/build-step).
[Skip deployments](https://vercel.com/docs/monorepos#skipping-unaffected-projects) when there are no changes to the root directory or its dependencies.
Learn more about [Root Directory](https://vercel.com/docs/deployments/configure-a-build#root-directory)

Show more
Now I can see the actual repo structure — and the answer is clear: package.json and server.js both live at chill-time/backend/, three levels deep from the repo root (portfolio-repo → chill-time → backend).

That confirms the theory. Your Root Directory setting needs to be:

chill-time/backend
Steps:

Go to Vercel → movix-backend project → Settings → Build and Deployment → Root Directory.
Enter exactly: chill-time/backend
Save.
Trigger a redeploy (push an empty commit, or use the "Redeploy" button on the latest deployment in the Vercel dashboard).
Check the build logs again — you should now see npm install running and dependency installation output, instead of the flat staticAssets list you got before.
One more thing worth double-checking while you're there: given the screenshot shows other project folders sitting alongside chill-time in the same repo (Games, chat-app, portfolio), and chill-time itself likely has more than just backend in it (probably a frontend too, given the name matches your project) — make sure chill-time/backend really is the full path to where server.js sits, not chill-time alone. Based on the breadcrumb in your screenshot (portfolio-repo / chill-time / backend /), it looks like chill-time/backend is correct.

Once you set that and redeploy, paste the new build log if it's still not working — but this should be the fix.


Jul 12 01:12:49.17 GET 500 movix-backend-ashen.vercel.app / ◇ injected env (0) from .env // tip: ⌘ override existing { override: true } Error: ENOENT: no such file or directory, mkdir 'logs' at Object.mkdirSync (node:fs:1350:26) at File._createLogDirIfNotExist (/var/task/chi

pasted

https://movix-backend-ashen.vercel.app/
Request Method
GET
Status Code
500 Internal Server Error
Remote Address
216.198.79.195:443
Referrer Policy
origin-when-cross-origin  This Serverless Function has crashed.
Your connection is working correctly.
Vercel is working correctly.
500: INTERNAL_SERVER_ERRORCode: FUNCTION_INVOCATION_FAILEDID: cpt1::2qpb5-1783808072929-fcc756931b93

If you are a visitor, contact the website owner or try again later.
If you are the owner, [learn how to fix the error](https://vercel.com/docs/errors/FUNCTION_INVOCATION_FAILED) and [check the logs](https://movix-backend-ashen.vercel.app/_logs?requestId=cpt1::2qpb5-1783808072929-fcc756931b93). *
Show more
Real progress — the Root Directory fix worked. Vercel is now correctly installing dependencies and running your actual Express app as a serverless function (that's why you're getting a real crash with a stack trace instead of static file serving). Now it's a genuine code bug, and the log tells you exactly what it is.

The bug: logger.js tries to write to a logs/ folder on disk

Error: ENOENT: no such file or directory, mkdir 'logs'
at file:///var/task/chill-time/backend/utilis/logger.js:11:9
Your winston logger (in utilis/logger.js) is configured to write log files to a local logs/ directory. That works fine on your machine or on Render (a traditional server with a persistent filesystem), but Vercel's serverless functions run on a read-only filesystem except for /tmp — there's no writable logs/ folder, and no way to create one at runtime. Every single invocation of your function crashes immediately trying to create it, which is why every route (even /, /favicon.ico) 500s.

Fix: make file logging conditional on environment, or drop it entirely for serverless

I don't have your logger.js file yet, but the fix will look like one of these:

Option A — Only use file transport outside serverless (simplest, keeps local dev logging to files):

js
import winston from "winston";

const isServerless = !!process.env.VERCEL;

const transports = [new winston.transports.Console()];

if (!isServerless) {
  transports.push(new winston.transports.File({ filename: "logs/error.log", level: "error" }));
  transports.push(new winston.transports.File({ filename: "logs/combined.log" }));
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports,
});

export default logger;
process.env.VERCEL is automatically set to "1" by Vercel at runtime — no extra config needed, it's a reliable way to detect "am I running on Vercel."

Option B — Write to /tmp instead of logs/ when on Vercel, if you actually want file logs to persist during a single function's lifetime (note: /tmp is ephemeral and wiped between cold starts, so this only helps for debugging within one invocation, not persistent logging):

js
const logDir = process.env.VERCEL ? "/tmp/logs" : "logs";
You'd still need to fs.mkdirSync(logDir, { recursive: true }) before winston tries to use it, since /tmp starts empty too.

Given you're on serverless, Option A is the right call — for real persistent logs on Vercel, people typically ship console output to a logging service (Better Stack, Axiom, Datadog, etc.) rather than writing to disk at all, since serverless instances are ephemeral and don't retain files between invocations anyway. But that's a bigger change — Option A alone will stop the 500 crash immediately.

Can you paste your current utilis/logger.js? I'll give you the exact corrected version rather than a generic template.

import winston from "winston";

export const logger=winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:'logs/error.log',level:"error"}),
        new winston.transports.File({filename: 'logs/combined.log'})
    ]
});
and i have log folder with two files on it one for error.log one for combined.log

Show more

Deliberated conditional file transport activation for environment compatibility
Deliberated conditional file transport activation for environment compatibility
Here's the fix — same structure, just makes the file transports conditional on whether you're running on Vercel:


Created a file, read a file
Created a file, read a file
What changed: the two File transports only get added to the transports array when process.env.VERCEL is falsy. Locally (and on Render, which doesn't set this variable), you still get exactly the same file logging behavior as before — your existing logs/error.log and logs/combined.log keep working untouched. On Vercel, only the Console transport is used, so nothing tries to mkdir a folder that can't exist there.

One thing to know going forward: console.log/console.error output on Vercel shows up in the same Runtime Logs panel you've been pasting from — so you're not losing visibility, just moving where the logs live. If you want logs to persist beyond Vercel's default retention window, that's when you'd wire up an external logging service later — not needed to fix this crash though.

Replace your utilis/logger.js with this, push, and the 500 should resolve. Want me to also check requestLogger.js (the middleware that presumably uses this logger) for anything else that might assume a writable filesystem?


Logger
JS 

import { logger } from "../utilis/logger.js"

export const requestLogger=(req,res,next)=>{
    logger.info({
        method: req.method,
        url:req.originalUrl,
        user:req.user?.id || null
    })
    next();
}



Claude is AI and can make mistakes. Please double-check responses.
Logger · JS
import winston from "winston";
 
// Vercel's serverless functions run on a read-only filesystem (except /tmp),
// so trying to mkdir/write to "logs/" crashes the function on every invocation.
// process.env.VERCEL is set automatically by Vercel at runtime — no config needed.
const isServerless = !!process.env.VERCEL;
 
const transports = [new winston.transports.Console()];
 
if (!isServerless) {
  transports.push(new winston.transports.File({ filename: "logs/error.log", level: "error" }));
  transports.push(new winston.transports.File({ filename: "logs/combined.log" }));
}
 
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});
 
