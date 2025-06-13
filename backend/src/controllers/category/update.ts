import { RequestHandler } from 'express';

import { categoryService } from '@/services';
import { bodySchema, Body } from '@/schemas/categories/update';
import { validation } from '@/middlewares/validation';

type Locals = { validated_body: Body };

type Params = {
  id: string;
};

export const updateByIdValidator = validation({ body: bodySchema });

type UpdateByIdProps = RequestHandler<
  Params,
  unknown,
  unknown,
  unknown,
  Locals
>;

export const updateById: UpdateByIdProps = async (req, res) => {
  const { id } = req.params;
  const { validated_body: data } = res.locals;

  const categoryUpdated = await categoryService.updateById({ id, data });

  if (categoryUpdated instanceof Error) {
    res.status(500).json({ error: categoryUpdated.message });
    return;
  }

  res.status(200).json(categoryUpdated);
};
