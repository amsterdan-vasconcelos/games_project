import { RequestHandler } from 'express';

import { categoryService } from '@/services';
import { bodySchema, Body } from '@/schemas/categories/create';
import { validation } from '@/middlewares/validation';

type Locals = {
  user_id: string;
  validated_body: Body;
};

export const createValidator = validation({ body: bodySchema });

type CreateProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const create: CreateProps = async (req, res) => {
  const { user_id, validated_body: data } = res.locals;

  const categoryCreated = await categoryService.create({ user_id, data });

  if (categoryCreated instanceof Error) {
    res.status(500).json({ error: categoryCreated.message });
    return;
  }

  res.status(201).json(categoryCreated);
};
