"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const start = () => {
    // await passportInit();
    //
    // await createEmailTransport();
    //
    // app.use(cors({ origin: `${process.env.CORS_ORIGINS}`.split(','), credentials: true }));
    // app.use(session({ secret: process.env.SECRET as string, resave: true, saveUninitialized: true }));
    // app.use(cookieParser(process.env.SECRET));
    //
    // app.use('/dots', DotsRouter);
    app.use(express_1.default.json());
    //
    // app.use('/auth', AuthRouter);
    // app.use('/apps', authenticateUserJwt, AppsRouter);
    // app.use('/languages', authenticateUserJwt, LanguagesRouter);
    // app.use('/programming-languages', authenticateUserJwt, ProgrammingLanguagesRouter);
    // app.use('/problems', authenticateUserJwt, ProblemsRouter);
    // app.use('/problem-topics', authenticateUserJwt, ProblemTopicsRouter);
    // app.use('/institutions', authenticateUserJwt, InstitutionsRouter);
    // app.use('/apps-api/auth', AAuthRouter);
    // app.use('/apps-api/problems', authenticateAppJwt, AProblemsRouter);
    // app.use('/apps-api/problem-topics', authenticateAppJwt, AProblemTopicsRouter);
    // app.use('/apps-api/programming-languages', authenticateAppJwt, AProgrammingLanguagesRouter);
    // app.use('/apps-api/solutions', authenticateAppJwt, ASolutionsRouter);
    //
    //
    app.listen(5000, () => console.log(`⚡️[server]: Server is running at http://localhost:5000`));
    // expressListRoutes(app, null);
    //
    // createWebSocket(server);
};
start();
