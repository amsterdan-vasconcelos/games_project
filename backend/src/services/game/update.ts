import Game from '@/models/game';
import { Body } from '@/schemas/games/updateById';

type UpdateGameProps = {
  id: string;
  data: Body;
};

export const updateById = async ({ id, data }: UpdateGameProps) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedGame) {
      return new Error('Game not found.');
    }

    return updatedGame;
  } catch (error) {
    console.error(`UPDATE_GAME: ${error}`);
    return new Error('Failed to update game.');
  }
};
