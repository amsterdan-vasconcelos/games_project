import { RequestHandler } from 'express';

import { userServices } from '@/services';
import { passwordCrypto } from '@/utils/crypto';
import { jwt } from '@/utils/jwt';

export const signIn: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Basic ')) {
    res.status(401).json({ message: 'Token not provided.' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_type, base64Credentials] = authorization.split(' ');

  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'utf-8',
  );

  const [email, password] = credentials.split(':');

  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }

  if (!password) {
    res.status(400).json({ error: 'Password is required.' });
    return;
  }

  const user = await userServices.signIn(email);

  if (user instanceof Error) {
    res.status(500).json({ Error: user.message });
    return;
  }

  if (!user || !user.full_name || !user.password) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  const passwordMatched = await passwordCrypto.verifyPassword({
    password,
    hashedPassword: user.password,
  });

  if (!passwordMatched) {
    res.status(400).json({ error: 'Invalid password' });
    return;
  }

  const accessToken = jwt.sign({ id: user.id, full_name: user.full_name });

  res.status(200).json(accessToken);
};
