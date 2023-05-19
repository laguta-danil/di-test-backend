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
exports.getUser = exports.logout = exports.login = exports.signToken = exports.UserRepository = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const user_1 = require("../entity/user");
exports.UserRepository = data_source_1.AppDataSource.getRepository(user_1.User);
const signToken = (sub, expiresIn = '7d') => {
    return jsonwebtoken_1.default.sign({
        iss: 'test- task',
        sub
    }, process.env.SECRET, { expiresIn });
};
exports.signToken = signToken;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, username } = req.user;
        if (req.isAuthenticated()) {
            const token = (0, exports.signToken)(id);
            res.cookie('access_token', token, { httpOnly: true, sameSite: true });
            return { isAuthenticated: true, user: { username } };
        }
    });
}
exports.login = login;
function logout(res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('access_token');
        return { user: { username: '' }, success: true };
    });
}
exports.logout = logout;
function getUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return { isAuthenticated: true, username: user[0].username };
    });
}
exports.getUser = getUser;
//# sourceMappingURL=auth.service.js.map