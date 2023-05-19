"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.RssRouter = void 0;
const post_controller_1 = __importDefault(require("./post.controller"));
exports.RssRouter = post_controller_1.default;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthRouter = auth_controller_1.default;
//# sourceMappingURL=index.js.map