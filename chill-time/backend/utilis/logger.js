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