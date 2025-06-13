import Game from '@/models/game';

export const getById = async (id: string) => {
  try {
    const game = await Game.findById(id);

    return game;
  } catch (error) {
    console.error(`GET_BY_ID_GAME: ${error}`);
    return new Error('Failed to retrieve game by ID.');
  }
};
