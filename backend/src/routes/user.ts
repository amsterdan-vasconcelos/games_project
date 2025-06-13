import { userControllers } from '@/controllers';
import { ensureAuthentication } from '@/middlewares/ensureAuthentication';
import { Router } from 'express';

const routes = Router();

routes.post('/signup', userControllers.signUpValidator, userControllers.signUp);

routes.post('/signin', userControllers.signIn);

routes.get('/summary', ensureAuthentication, userControllers.summary);

export { routes };
