import Platform from '@/models/platform';
import { Body } from '@/schemas/platforms/update';

type UpdatePlatformProps = {
  id: string;
  data: Body;
};

export const updateById = async ({ id, data }: UpdatePlatformProps) => {
  try {
    const updated = await Platform.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return new Error('Platform not found.');
    }

    return updated;
  } catch (error) {
    console.error(`UPDATE_PLATFORM: ${error}`);
    return new Error('Failed to update platform');
  }
};
