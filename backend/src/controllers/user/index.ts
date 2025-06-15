import * as signIn from './signin';
import * as signUp from './signup';
import * as summary from './summary';
import * as refresh from './refresh';

export const userControllers = {
  ...signUp,
  ...signIn,
  ...refresh,
  ...summary,
};
