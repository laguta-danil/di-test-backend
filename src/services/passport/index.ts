import passport from 'passport';
import { jwtUserStrategy, localUserStrategy } from './strategies';

export const passportInit = async () => {
  passport.use('jwt-user', jwtUserStrategy);
  passport.use('local-user', localUserStrategy);
};
