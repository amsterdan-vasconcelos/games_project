import { RequestHandler } from 'express';
import {
  verifyToken,
  ERROR_MESSAGES,
  sendAuthError,
  hashFingerprint,
} from '@/utils/auth';

type EnsureAuthenticatedProps = RequestHandler;

export const ensureAuthenticated: EnsureAuthenticatedProps = (
  req,
  res,
  next,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendAuthError(res, ERROR_MESSAGES.TOKEN_NOT_PROVIDED, 401);
  }

  const token = authorization.split(' ')[1];
  const decoded = verifyToken(token);

  if ('error' in decoded) {
    const { message, status } = decoded.error;
    return sendAuthError(res, message, status);
  }

  if (decoded.type === 'refresh') {
    return sendAuthError(res, ERROR_MESSAGES.REFRESH_TOKEN_NOT_ALLOWED, 401);
  }

  const fingerprint = req.cookies.fingerprint;

  if (!fingerprint) {
    return sendAuthError(res, ERROR_MESSAGES.FINGERPRINT_REQUIRED, 401);
  }

  const ctx = hashFingerprint(fingerprint);

  if (decoded.ctx !== ctx) {
    return sendAuthError(res, ERROR_MESSAGES.INVALID_FINGERPRINT, 401);
  }

  res.locals = { ...res.locals, user_id: decoded.user_id };

  next();
};
