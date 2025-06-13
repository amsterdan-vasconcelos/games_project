import User from '../../models/user';

export const signIn = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(`Error in signIn service: ${error}`);
    return new Error('User not found');
  }
};
