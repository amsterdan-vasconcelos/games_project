import Platform from '@/models/platform';
import { Body } from '@/schemas/platforms/create';

type CreatePlatformProps = {
  user_id: string;
  data: Body;
};

export const create = async ({ user_id, data }: CreatePlatformProps) => {
  try {
    const platform = new Platform({ user_id, ...data });

    const result = await platform.save();
    return result;
  } catch (error) {
    console.error(`CREATE_PLATFORM: ${error}`);
    return new Error('Failed to create platform');
  }
};
