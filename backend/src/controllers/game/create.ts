import { RequestHandler } from 'express';

import { gameServices } from '@/services';
import { bodySchema, Body } from '@/schemas/games/create';
import { validation } from '@/middlewares/validation';

type Locals = { validated_body: Body; user_id: string };

export const createValidator = validation({
  body: bodySchema,
});

type CreateProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const create: CreateProps = async (_req, res) => {
  const { user_id, validated_body: data } = res.locals;

  const game = await gameServices.create({ user_id, data });

  if (game instanceof Error) {
    res.status(501).json({ Error: game.message });
  }

  res.status(201).json(game);
};
