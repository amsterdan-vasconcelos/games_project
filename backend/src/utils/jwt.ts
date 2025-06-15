import { UserId } from '@/types/mongoose';
import * as jwtRoot from 'jsonwebtoken';
import { createObjectError } from './objectError';

type AccessTokenPayload = {
  user_id: UserId;
  full_name: string;
  ctx: string;
  type: 'access';
};

type RefreshTokenPayload = {
  username: string;
  ctx: string;
  type: 'refresh';
};

type ExpiresIn = jwtRoot.SignOptions['expiresIn'];

const signAccessToken = (data: Omit<AccessTokenPayload, 'type'>) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return createObjectError('Internal server error', 500);

  const payload = { ...data, type: 'access' };
  const expiresIn = (process.env.ACCESS_TOKEN_EXPIRES || '15m') as ExpiresIn;

  return jwtRoot.sign(payload, secret, { expiresIn });
};

const signRefreshToken = (data: Omit<RefreshTokenPayload, 'type'>) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return createObjectError('Internal server error', 500);

  const payload = { ...data, type: 'refresh' };
  const expiresIn = (process.env.REFRESH_TOKEN_EXPIRES || '1h') as ExpiresIn;

  return jwtRoot.sign(payload, secret, { expiresIn });
};

const verify = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!process.env.JWT_SECRET) {
    return createObjectError('Internal server error', 500);
  }

  try {
    const decoded = jwtRoot.verify(token, secret);

    if (typeof decoded === 'string') {
      return createObjectError('Invalid token', 401);
    }

    return decoded as AccessTokenPayload | RefreshTokenPayload;
  } catch (error) {
    if (error instanceof jwtRoot.TokenExpiredError) {
      console.error('Token expired:', error);
      return createObjectError('Token expired', 401);
    }

    console.error('JWT verification error:', error);
    return createObjectError('Invalid token', 401);
  }
};

const jwt = {
  sign: { signAccessToken, signRefreshToken },
  verify,
};

export { jwt };
