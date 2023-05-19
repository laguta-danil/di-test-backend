import dotenv from 'dotenv';

dotenv.config();
import cookieParser from "cookie-parser";
import express from "express"
import session from "express-session";
import { AuthRouter, RssRouter } from "./controllers";
import { AppDataSource } from "./data-source";
import { passportInit } from "./services/passport";
import cors from 'cors';
import { authenticateUserJwt } from "./services/passport/middlewares";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const app = express();

const start = async () => {

    await passportInit();
    app.use(cors({origin: `${process.env.CORS_ORIGINS}`.split(','), credentials: true}));
    app.use(session({secret: process.env.SECRET as string, resave: true, saveUninitialized: true}));
    app.use(cookieParser(process.env.SECRET));

    app.use(express.json());

    app.use('/auth', AuthRouter);
    app.use('/posts', authenticateUserJwt, RssRouter);
    app.listen(process.env.PORT,
        () => console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`));
};

start();
