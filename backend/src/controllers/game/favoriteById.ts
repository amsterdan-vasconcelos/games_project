import { RequestHandler } from 'express';

import { gameServices } from '@/services';
import { bodySchema, Body } from '@/schemas/games/favoriteById';
import { validation } from '@/middlewares/validation';

type Locals = { validated_body: Body };

type Params = { id: string };

export const favoriteByIdValidator = validation({
  body: bodySchema,
});

type FavoriteProps = RequestHandler<Params, unknown, unknown, unknown, Locals>;

export const favoriteById: FavoriteProps = async (req, res) => {
  const { id } = req.params;
  const { validated_body } = res.locals;
  const { favorite } = validated_body;

  const game = await gameServices.favoriteById({ id, favorite });

  if (game instanceof Error) {
    res.status(501).json({ error: game.message });
    return;
  }

  res.status(200).json(game);
};
