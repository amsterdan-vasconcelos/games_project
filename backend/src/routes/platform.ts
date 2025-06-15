import { Router } from 'express';

import { platformControllers } from '@/controllers';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';

const routes = Router();

routes.get(
  '/platforms',
  ensureAuthenticated,
  platformControllers.getAllValidator,
  platformControllers.getAll,
);

routes.post(
  '/platforms',
  ensureAuthenticated,
  platformControllers.createValidator,
  platformControllers.create,
);

routes.put(
  '/platforms/:id',
  ensureAuthenticated,
  platformControllers.updateByIdValidator,
  platformControllers.updateById,
);

routes.delete(
  '/platforms/:id',
  ensureAuthenticated,
  platformControllers.deleteById,
);

export { routes };
