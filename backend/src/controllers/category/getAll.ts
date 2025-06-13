import { RequestHandler } from 'express';

import { categoryService } from '@/services';
import { validation } from '@/middlewares/validation';
import { querySchema, Query } from '@/schemas/categories/getAll';

type Locals = {
  validated_query: Query;
  user_id: string;
};

type GetAllProps = RequestHandler<unknown, unknown, unknown, unknown, Locals>;

export const getAllValidator = validation({ query: querySchema });

export const getAll: GetAllProps = async (_req, res) => {
  const { user_id, validated_query: data } = res.locals;

  const categoriesAndCount = await categoryService.getAll({ user_id, data });

  if (categoriesAndCount instanceof Error) {
    res.status(400).json({ Error: categoriesAndCount.message });
    return;
  }

  res.status(200).json(categoriesAndCount);
};
