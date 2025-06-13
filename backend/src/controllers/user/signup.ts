import { RequestHandler } from 'express';

import { userServices } from '@/services';
import { validation } from '@/middlewares/validation';
import { bodySchema, type Body } from '@/schemas/users/signup';
import { passwordCrypto } from '@/utils/crypto';

export const signUpValidator = validation({ body: bodySchema });

type SignUp = RequestHandler;

export const signUp: SignUp = async (_req, res) => {
  const { full_name, email, password } = res.locals.body as Body;

  const hashedPassword = await passwordCrypto.hashPassword({
    password,
    salt: 10,
  });

  const user = await userServices.signUp({
    full_name,
    email,
    password: hashedPassword,
  });

  if (user instanceof Error) {
    res.status(501).json({ Error: user.message });
    return;
  }

  res.status(201).json(user);
};
