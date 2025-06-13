import * as create from './create';
import * as deleteById from './delete';
import * as getAll from './getAll';
import * as updateById from './update';

export const categoryService = {
  ...create,
  ...getAll,
  ...deleteById,
  ...updateById,
};
