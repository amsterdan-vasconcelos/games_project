import { RequestHandler } from 'express';

import { platformServices } from '@/services';
import { querySchema, Query } from '@/schemas/platforms/getAll';
import { validation } from '@/middlewares/validation';

type Locals = {
  user_id: string;
  validated_query: Query;
};

export const getAllValidator = validation({ query: querySchema });

type GetAllProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const getAll: GetAllProps = async (_req, res) => {
  const { user_id, validated_query: data } = res.locals;

  const platformsAndCount = await platformServices.getAll({ user_id, data });

  if (platformsAndCount instanceof Error) {
    res.status(400).json({ Error: platformsAndCount.message });
    return;
  }

  res.status(200).json(platformsAndCount);
};
