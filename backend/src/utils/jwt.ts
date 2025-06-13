import * as jwtRoot from 'jsonwebtoken';

type JwtData = { id: string; full_name: string };

const sign = (data: JwtData) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  return jwtRoot.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwtRoot.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') return 'INVALID_TOKEN';

    return decoded as JwtData;
  } catch (error) {
    console.error('JWT verification error:', error);
    return 'INVALID_TOKEN';
  }
};

const jwt = {
  sign,
  verify,
};

export { jwt };
