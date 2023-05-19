import passport from 'passport';

export const authenticateUserJwt = passport.authenticate('jwt-user', { session: false });
export const authenticateUserLocal = passport.authenticate('local-user', { session: false });