import { userControllers } from '@/controllers';
import { ensureAuthenticated } from '@/middlewares/ensureAuthenticated';
import { Router } from 'express';

const routes = Router();

routes.post('/signup', userControllers.signUpValidator, userControllers.signUp);

routes.post('/signin', userControllers.signIn);

routes.post('/refresh', userControllers.refresh);

routes.get('/summary', ensureAuthenticated, userControllers.summary);

export { routes };
