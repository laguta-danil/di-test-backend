"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const post_1 = require("./entity/post");
const user_1 = require("./entity/user");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.SQL_DB_HOST,
    port: 5432,
    username: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [user_1.User, post_1.Post],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map