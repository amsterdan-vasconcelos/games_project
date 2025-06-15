import { Router } from 'express';

import { categoryController } from '@/controllers';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const routes = Router();

routes.get(
  '/categories',
  ensureAuthenticated,
  categoryController.getAllValidator,
  categoryController.getAll,
);

routes.post(
  '/categories',
  ensureAuthenticated,
  categoryController.createValidator,
  categoryController.create,
);

routes.put(
  '/categories/:id',
  ensureAuthenticated,
  categoryController.updateByIdValidator,
  categoryController.updateById,
);

routes.delete(
  '/categories/:id',
  ensureAuthenticated,
  categoryController.deleteById,
);

export { routes };
