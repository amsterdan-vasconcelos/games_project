import Game from '@/models/game';

export const deleteById = async (id: string) => {
  try {
    const deleted = await Game.findByIdAndUpdate(
      id,
      { is_deleted: true },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deleted) {
      return new Error('Game not found.');
    }

    return deleted._id;
  } catch (error) {
    console.error(`DELETE_GAME: ${error}`);
    return new Error('Failed to delete game.');
  }
};
