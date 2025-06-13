import { gamesControllers } from '@/controllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { Router } from 'express';

const {
  create,
  createValidator,
  deleteById,
  favoriteById,
  favoriteByIdValidator,
  getAll,
  getAllValidator,
  getById,
  updateById,
  updateByIdValidator,
} = gamesControllers;

const routes = Router();

routes.use(ensureAuthentication);

routes.get('/games', getAllValidator, getAll);
routes.post('/games', createValidator, create);
routes.get('/games/:id', getById);
routes.put('/games/:id', updateByIdValidator, updateById);
routes.delete('/games/:id', ensureAuthentication, deleteById);
routes.patch('/games/:id', favoriteByIdValidator, favoriteById);

export { routes };
