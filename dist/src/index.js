"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const controllers_1 = require("./controllers");
const data_source_1 = require("./data-source");
const passport_1 = require("./services/passport");
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./services/passport/middlewares");
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, passport_1.passportInit)();
    app.use((0, cors_1.default)({ origin: `${process.env.CORS_ORIGINS}`.split(','), credentials: true }));
    app.use((0, express_session_1.default)({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
    app.use((0, cookie_parser_1.default)(process.env.SECRET));
    app.use(express_1.default.json());
    app.use('/auth', controllers_1.AuthRouter);
    app.use('/posts', middlewares_1.authenticateUserJwt, controllers_1.RssRouter);
    app.listen(process.env.PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`));
});
start();
//# sourceMappingURL=index.js.map