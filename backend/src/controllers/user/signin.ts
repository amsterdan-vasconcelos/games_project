import { RequestHandler } from 'express';
import { userServices } from '@/services';
import { passwordCrypto } from '@/utils/crypto';
import {
  ERROR_MESSAGES,
  COOKIE_CONFIG,
  generateFingerprint,
  hashFingerprint,
  createTokens,
  sendAuthError,
} from '@/utils/auth';

export const signIn: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith('Basic ')) {
    return sendAuthError(res, ERROR_MESSAGES.TOKEN_NOT_PROVIDED, 401);
  }

  const [email, password] = Buffer.from(authorization.split(' ')[1], 'base64')
    .toString('utf-8')
    .split(':');

  if (!email || !password) {
    return sendAuthError(res, ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
  }

  const user = await userServices.signIn(email);

  if (user instanceof Error || !user?._id) {
    return sendAuthError(res, ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
  }

  const passwordValid = await passwordCrypto.verifyPassword({
    password,
    hashedPassword: user.password!,
  });

  if (!passwordValid) {
    return sendAuthError(res, ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
  }

  const fingerprint = generateFingerprint();
  const ctx = hashFingerprint(fingerprint);
  const { accessToken, refreshToken } = createTokens({
    user_id: user._id,
    full_name: user.full_name!,
    username: user.email!,
    ctx,
  });

  if (typeof accessToken !== 'string') {
    const { message, status } = accessToken.error;
    return sendAuthError(res, message, status);
  }
  if (typeof refreshToken !== 'string') {
    const { message, status } = refreshToken.error;
    return sendAuthError(res, message, status);
  }

  res.cookie('fingerprint', fingerprint, COOKIE_CONFIG);
  res.status(200).json({ accessToken, refreshToken });
};
