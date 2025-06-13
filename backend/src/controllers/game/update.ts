import { RequestHandler } from 'express';

import { gameServices } from '@/services';
import { bodySchema, Body } from '@/schemas/games/updateById';
import { validation } from '@/middlewares/validation';

type Locals = { validated_body: Body };

type Params = { id: string };

export const updateByIdValidator = validation({ body: bodySchema });

type UpdateProps = RequestHandler<Params, unknown, unknown, unknown, Locals>;

export const updateById: UpdateProps = async (req, res) => {
  const { id } = req.params;
  const { validated_body: data } = res.locals;

  const game = await gameServices.updateById({ id, data });

  if (game instanceof Error) {
    res.status(501).json({ error: game.message });
    return;
  }

  res.status(200).json(game);
};
