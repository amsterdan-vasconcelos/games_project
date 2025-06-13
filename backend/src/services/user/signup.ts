import User from '@/models/user';
import { Body } from '@/schemas/users/signup';

type SignUp = Omit<Body, 'confirm_password'>;

export const signUp = async ({ full_name, email, password }: SignUp) => {
  try {
    const instance = new User({ full_name, email, password });

    const createdUser = await instance.save();
    return createdUser;
  } catch (error) {
    console.error(`Sign Up: ${error}`);
    return new Error('Failed to register user');
  }
};
