import JWT from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user';

export const UserRepository = AppDataSource.getRepository(User);

export const signToken = (sub: any, expiresIn = '7d') => {
  return JWT.sign(
    {
      iss: 'test- task',
      sub,
    },
    process.env.SECRET as string,
    { expiresIn },
  );
};

export async function login(req: any, res: any) {
  const { id, username }: any = req.user;
  if (req.isAuthenticated()) {
    const token = signToken(id);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    return { isAuthenticated: true, user: { username } };
  }
}

export async function logout(res: any) {
  res.clearCookie('access_token');
  return { user: { username: '' }, success: true };
}

export async function getUser(user: any) {
  return { isAuthenticated: true, username: user[0].username };
}
