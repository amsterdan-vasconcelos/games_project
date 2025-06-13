import { categoryController } from '@/controllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { Router } from 'express';

const {
  create,
  createValidator,
  deleteById,
  getAll,
  getAllValidator,
  updateById,
  updateByIdValidator,
} = categoryController;

const routes = Router();

routes.use(ensureAuthentication);

routes.get('/categories', getAllValidator, getAll);
routes.post('/categories', createValidator, create);
routes.put('/categories/:id', updateByIdValidator, updateById);
routes.delete('/categories/:id', deleteById);

export { routes };
