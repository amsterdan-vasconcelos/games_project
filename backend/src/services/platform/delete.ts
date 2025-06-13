import Platform from '@/models/platform';

export const deleteById = async (id: string) => {
  try {
    const deleted = await Platform.findByIdAndUpdate(
      id,
      { $set: { is_deleted: true } },
      { new: true, runValidators: true },
    );

    if (!deleted) {
      return new Error('Platform not found.');
    }

    return deleted._id;
  } catch (error) {
    console.log(`DELETE_PLATFORM: ${error}`);
    return new Error('Failed to delete platform');
  }
};
