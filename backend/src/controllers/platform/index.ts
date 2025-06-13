import * as create from './create';
import * as deleteById from './delete';
import * as getAll from './getAll';
import * as updateById from './update';

export const platformControllers = {
  ...create,
  ...getAll,
  ...updateById,
  ...deleteById,
};
