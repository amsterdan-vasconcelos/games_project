import { RequestHandler } from 'express';
import { jwt } from '@/utils/jwt';

type Locals = {
  user_id: string;
};

type EnsureAuthenticationProps = RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  Locals
>;

export const ensureAuthentication: EnsureAuthenticationProps = (
  req,
  res,
  next,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token not provided.' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_type, token] = authorization.split(' ');

  const decoded = jwt.verify(token);

  if (decoded === 'JWT_SECRET_NOT_FOUND') {
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }

  if (decoded === 'INVALID_TOKEN') {
    res.status(401).json({ message: 'Token not provided.' });
    return;
  }

  res.locals.user_id = decoded.id;

  next();
};
