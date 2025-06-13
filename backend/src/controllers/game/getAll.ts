import { RequestHandler } from 'express';

import { gameServices } from '@/services/game';
import { querySchema, Query } from '@/schemas/games/getAll';
import { validation } from '@/middlewares/validation';

type Locals = {
  validated_query: Query;
  user_id: string;
};

type GetAllProps = RequestHandler<unknown, unknown, unknown, Query, Locals>;

export const getAllValidator = validation({ query: querySchema });

export const getAll: GetAllProps = async (_req, res) => {
  const { user_id, validated_query: data } = res.locals;

  const games = await gameServices.getAll({ user_id, data });

  if (games instanceof Error) {
    res.status(400).json({ Error: games.message });
    return;
  }

  res.status(200).json(games);
};
