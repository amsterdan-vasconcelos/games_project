import { gamesControllers } from '@/controllers';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';
import { Router } from 'express';

const routes = Router();

routes.get(
  '/games',
  ensureAuthenticated,
  gamesControllers.getAllValidator,
  gamesControllers.getAll,
);

routes.post(
  '/games',
  ensureAuthenticated,
  gamesControllers.createValidator,
  gamesControllers.create,
);

routes.get('/games/:id', ensureAuthenticated, gamesControllers.getById);

routes.put(
  '/games/:id',
  ensureAuthenticated,
  gamesControllers.updateByIdValidator,
  gamesControllers.updateById,
);

routes.delete('/games/:id', ensureAuthenticated, gamesControllers.deleteById);

routes.patch(
  '/games/:id',
  ensureAuthenticated,
  gamesControllers.favoriteByIdValidator,
  gamesControllers.favoriteById,
);

export { routes };
