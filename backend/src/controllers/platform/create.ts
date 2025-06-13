import { RequestHandler } from 'express';

import { platformServices } from '@/services';
import { bodySchema, Body } from '@/schemas/platforms/create';
import { validation } from '@/middlewares/validation';

type Locals = {
  user_id: string;
  validated_body: Body;
};

export const createValidator = validation({ body: bodySchema });

type CreateProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const create: CreateProps = async (req, res) => {
  const { user_id, validated_body: data } = res.locals;

  const platformCreated = await platformServices.create({ user_id, data });

  if (platformCreated instanceof Error) {
    res.status(501).json({ error: platformCreated.message });
    return;
  }

  res.status(201).json(platformCreated);
};
