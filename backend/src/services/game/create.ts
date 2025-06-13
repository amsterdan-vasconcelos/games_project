import Game from '@/models/game';
import { Body } from '@/schemas/games/create';

type CreateProps = {
  data: Body;
  user_id: string;
};

export const create = async ({ user_id, data }: CreateProps) => {
  try {
    const game = new Game({ user_id, ...data });

    const createdGame = await game.save();
    return createdGame;
  } catch (error) {
    console.log(`REGISTER_GAME: ${error}`);
    return new Error('Error registering game.');
  }
};
