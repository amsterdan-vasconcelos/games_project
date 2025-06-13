import { categoryService } from '@/services';
import { RequestHandler } from 'express';

type Params = {
  id: string;
};

type DeleteProps = RequestHandler<Params>;

export const deleteById: DeleteProps = async (req, res) => {
  const { id } = req.params;

  const categoryDeleted = await categoryService.deleteById(id);

  if (categoryDeleted instanceof Error) {
    res.status(500).json({ error: categoryDeleted.message });
    return;
  }

  res.status(200).json(categoryDeleted);
};
