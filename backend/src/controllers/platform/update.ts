import { RequestHandler } from 'express';

import { platformServices } from '@/services';
import { bodySchema, Body } from '@/schemas/platforms/update';
import { validation } from '@/middlewares/validation';

type Locals = {
  validated_body: Body;
};

type Params = {
  id: string;
};

export const updateByIdValidator = validation({ body: bodySchema });

type UpdateProps = RequestHandler<Params, unknown, unknown, unknown, Locals>;

export const updateById: UpdateProps = async (req, res) => {
  const { id } = req.params;
  const { validated_body: data } = res.locals;

  const platformUpdated = await platformServices.updateById({ id, data });

  if (platformUpdated instanceof Error) {
    res.status(501).json({ error: platformUpdated.message });
    return;
  }

  res.status(200).json(platformUpdated);
};
