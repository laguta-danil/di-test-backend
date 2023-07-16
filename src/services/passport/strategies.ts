import bcrypt from 'bcryptjs';
import { Request } from 'express';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import { UserRepository } from '../auth.service';

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

const cookieExtractor = (req: Request) => req?.cookies?.access_token || null;

export const jwtUserStrategy = new JwtStrategy(
  { jwtFromRequest: cookieExtractor, secretOrKey: process.env.SECRET },
  async (payload: any, done: Function) => {
    const user = await UserRepository.findBy({ id: payload.sub });

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  },
);

export const localUserStrategy = new LocalStrategy(
  async (username: any, password, done) => {
    const usersCount = await UserRepository.count();
    const temporaryPassword = await bcrypt.hash('admin', 10);

    if (usersCount === 0) {
      await UserRepository.save({
        username: 'admin',
        password: temporaryPassword,
      });
    }

    const user: any = await UserRepository.findOne({
      where: { username: username },
    });

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }

    return done(null, false);
  },
);
