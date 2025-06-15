import crypto from 'crypto';
import { jwt } from './jwt';
import { Response } from 'express';
import { Types } from 'mongoose';

export type AuthTokenPayload = {
  user_id?: string;
  full_name?: string;
  username?: string;
  ctx: string;
};

export const ERROR_MESSAGES = {
  TOKEN_NOT_PROVIDED: 'Token not provided.',
  TOKEN_EXPIRED: 'Token expired.',
  INVALID_CREDENTIALS: 'Invalid credentials provided.',
  EMAIL_REQUIRED: 'Email is required.',
  PASSWORD_REQUIRED: 'Password is required.',
  INTERNAL_ERROR: 'Internal server error.',
  REFRESH_TOKEN_NOT_ALLOWED: 'Refresh token is not allowed here.',
  ACCESS_TOKEN_NOT_ALLOWED: 'Access token is not allowed here.',
  FINGERPRINT_REQUIRED: 'Fingerprint is required.',
  INVALID_FINGERPRINT: 'Invalid fingerprint',
  USER_NOT_FOUND: 'User not found',
};

export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export const generateFingerprint = () => crypto.randomBytes(16).toString('hex');

export const hashFingerprint = (fingerprint: string) =>
  crypto.createHash('sha256').update(fingerprint).digest('hex');

export const verifyToken = (token: string) => jwt.verify(token);

type CreateTokens = {
  user_id: Types.ObjectId;
  full_name: string;
  username: string;
  ctx: string;
};

export const createTokens = (data: CreateTokens) => {
  const { user_id, full_name, username, ctx } = data;
  const accessToken = jwt.sign.signAccessToken({ user_id, full_name, ctx });
  const refreshToken = jwt.sign.signRefreshToken({ username, ctx });

  return { accessToken, refreshToken };
};

export const sendAuthError = (
  res: Response,
  message: string,
  statusCode = 401,
) => {
  res.status(statusCode).json({ error: message });
};
