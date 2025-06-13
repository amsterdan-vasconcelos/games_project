import * as signIn from './signin';
import * as signUp from './signup';
import * as summary from './summary';

export const userControllers = {
  ...signUp,
  ...signIn,
  ...summary,
};
