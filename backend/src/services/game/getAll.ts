import Game from '@/models/game';
import { Query } from '@/schemas/games/getAll';
import { getPaginationItems } from '@/utils/pagination';

type getAllProps = {
  user_id: string;
  data: Query;
};

export const getAll = async ({ user_id, data }: getAllProps) => {
  const {
    per_page,
    page = 1,
    sort,
    dir = 'asc',
    title,
    category,
    favorite,
  } = data;

  const filters = {
    user_id,
    is_deleted: false,
    ...(title && { title: { $regex: title, $options: 'i' } }),
    ...(category && { category }),
    ...(favorite && { favorite }),
  };

  try {
    const query = Game.find(filters);

    if (per_page) {
      const skip = (page - 1) * per_page;

      query.limit(per_page).skip(skip);
    }

    if (sort) {
      query.sort({ [sort]: dir });
    } else {
      query.sort({ created_at: 'desc' });
    }

    const [games, count] = await Promise.all([
      query,
      Game.countDocuments(filters),
    ]);

    const total_pages = per_page ? Math.ceil(count / per_page) : 1;
    const pages = total_pages ? getPaginationItems(page, total_pages) : [];

    return {
      games,
      total_games: count,
      pagination: {
        current_page: page,
        total_pages,
        pages,
      },
    };
  } catch (error) {
    console.error(`GET_ALL_GAMES: ${error}`);
    return new Error('Failed to retrieve games');
  }
};
