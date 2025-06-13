import { RequestHandler } from 'express';

import { platformServices } from '@/services';

type Params = {
  id: string;
};

type DeleteProps = RequestHandler<Params>;

export const deleteById: DeleteProps = async (req, res) => {
  const { id } = req.params;

  const platformDeleted = await platformServices.deleteById(id);

  if (platformDeleted instanceof Error) {
    res.status(501).json({ error: platformDeleted.message });
    return;
  }

  res.status(200).json(platformDeleted);
};
