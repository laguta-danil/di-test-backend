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
exports.localUserStrategy = exports.jwtUserStrategy = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = __importDefault(require("passport-local"));
const auth_service_1 = require("../auth.service");
const JwtStrategy = passport_jwt_1.default.Strategy;
const LocalStrategy = passport_local_1.default.Strategy;
const cookieExtractor = (req) => { var _a; return ((_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.access_token) || null; };
exports.jwtUserStrategy = new JwtStrategy({ jwtFromRequest: cookieExtractor, secretOrKey: process.env.SECRET }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.UserRepository.findBy({ id: payload.sub });
    if (user) {
        return done(null, user);
    }
    return done(null, false);
}));
exports.localUserStrategy = new LocalStrategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCount = yield auth_service_1.UserRepository.count();
    const temporaryPassword = yield bcryptjs_1.default.hash('admin', 10);
    if (usersCount === 0) {
        yield auth_service_1.UserRepository.save({ username: 'admin', password: temporaryPassword });
    }
    const user = yield auth_service_1.UserRepository.findOne({ where: { username: username } });
    if (yield bcryptjs_1.default.compare(password, user.password)) {
        return done(null, user);
    }
    return done(null, false);
}));
//# sourceMappingURL=strategies.js.map