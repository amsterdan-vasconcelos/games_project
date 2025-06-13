import * as create from './create';
import * as deleteById from './delete';
import * as favoriteById from './favoriteById';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './update';

export const gameServices = {
  ...create,
  ...getAll,
  ...updateById,
  ...deleteById,
  ...getById,
  ...favoriteById,
};
