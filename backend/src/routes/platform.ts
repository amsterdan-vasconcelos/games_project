import { Router } from 'express';

import { platformControllers } from '@/controllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';

const {
  create,
  createValidator,
  deleteById,
  getAll,
  getAllValidator,
  updateById,
  updateByIdValidator,
} = platformControllers;

const routes = Router();

routes.use(ensureAuthentication);

routes.get('/platforms', getAllValidator, getAll);
routes.post('/platforms', createValidator, create);
routes.put('/platforms/:id', updateByIdValidator, updateById);
routes.delete('/platforms/:id', deleteById);

export { routes };
