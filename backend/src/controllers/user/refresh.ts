import { RequestHandler } from 'express';
import { userServices } from '@/services';
import {
  ERROR_MESSAGES,
  verifyToken,
  hashFingerprint,
  createTokens,
  sendAuthError,
} from '@/utils/auth';

export const refresh: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  const fingerprint = req.cookies.fingerprint;

  if (!refreshToken || !fingerprint) {
    return sendAuthError(res, ERROR_MESSAGES.TOKEN_NOT_PROVIDED);
  }

  const decoded = verifyToken(refreshToken);

  if ('error' in decoded) {
    const { message, status } = decoded.error;
    return sendAuthError(res, message, status);
  }

  if (decoded.type === 'access') {
    return sendAuthError(res, ERROR_MESSAGES.ACCESS_TOKEN_NOT_ALLOWED, 400);
  }

  const ctx = hashFingerprint(fingerprint);
  if (decoded.ctx !== ctx) {
    return sendAuthError(res, ERROR_MESSAGES.INVALID_FINGERPRINT, 401);
  }

  const user = await userServices.refresh(decoded.username);

  if (user instanceof Error || !user?._id) {
    return sendAuthError(res, ERROR_MESSAGES.USER_NOT_FOUND, 404);
  }

  const { accessToken, refreshToken: newRefreshToken } = createTokens({
    user_id: user._id,
    full_name: user.full_name!,
    username: user.email!,
    ctx,
  });

  res.status(200).json({ accessToken, refreshToken: newRefreshToken });
};
