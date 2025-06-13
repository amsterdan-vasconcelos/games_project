import Game from '@/models/game';

type FavoriteGameProps = {
  id: string;
  favorite: boolean;
};

export const favoriteById = async ({ id, favorite }: FavoriteGameProps) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { favorite },
      { new: true, runValidators: true },
    );

    if (!updatedGame) {
      return new Error('Game not found.');
    }

    return updatedGame._id;
  } catch (error) {
    console.error(`FAVORITE_GAME: ${error}`);
    return new Error('Failed to update favorite status.');
  }
};
