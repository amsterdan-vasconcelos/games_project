import User from '@/models/user';

export const refresh = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error(`Error in refresh service: ${error}`);
    return new Error('User not found');
  }
};
