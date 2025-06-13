import { RequestHandler } from 'express';

import { gameServices } from '@/services';

type Params = {
  id: string;
};

type GetByIdProps = RequestHandler<Params>;

export const getById: GetByIdProps = async (req, res) => {
  const { id } = req.params;

  const game = await gameServices.getById(id);

  if (game instanceof Error) {
    res.status(501).json({ error: game.message });
    return;
  }

  res.status(200).json(game);
};
