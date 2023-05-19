import express from 'express';
import * as auth from '../services/auth.service';
import { authenticateUserJwt, authenticateUserLocal } from "../services/passport/middlewares";

const router = express.Router();

router.post('/login', authenticateUserLocal, async (req, res, next) => {
    try {
        res.json(await auth.login(req, res));
    } catch (err) {
        console.error(`Error while logging in`, err);
        next(err);
    }

})

router.get('/logout', authenticateUserJwt, async (req, res, next) => {
    try {
        res.json(await auth.logout(res));
    } catch (err) {
        console.error(`Error while logging out`, err);
        next(err);
    }
})

router.get("/user", authenticateUserJwt, async (req, res, next) => {
    try {
        res.json(await auth.getUser(req.user))
    } catch (err) {
        console.error(`Error while getting user`, err);
        next(err);
    }
})

export default router;