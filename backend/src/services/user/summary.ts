import Category from '../../models/category';
import Game from '../../models/game';
import Platform from '../../models/platform';

export const summary = async (user_id: string) => {
  const filter = { user_id, is_deleted: false };
  const filterFavorite = { ...filter, favorite: true };

  try {
    const [gamesCount, favoriteGamesCount, categoriesCount, platformCount] =
      await Promise.all([
        Game.countDocuments(filter),
        Game.countDocuments(filterFavorite),
        Category.countDocuments(filter),
        Platform.countDocuments(filter),
      ]);

    return { gamesCount, favoriteGamesCount, categoriesCount, platformCount };
  } catch (error) {
    console.error(error);
    return new Error('Failed to retrieve user summary');
  }
};
