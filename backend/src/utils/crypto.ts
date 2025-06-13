import { genSalt, hash, compare } from 'bcrypt';

type HashPassword = {
  password: string;
  salt?: number;
};

type VerifyPassword = {
  password: string;
  hashedPassword: string;
};

const hashPassword = async ({ password, salt = 8 }: HashPassword) => {
  const saltGenerated = await genSalt(salt);
  const hashPassword = await hash(password, saltGenerated);
  return hashPassword;
};

const verifyPassword = async ({ password, hashedPassword }: VerifyPassword) => {
  const passwordMatched = await compare(password, hashedPassword);
  return passwordMatched;
};

const passwordCrypto = {
  hashPassword,
  verifyPassword,
};

export { passwordCrypto };
