import Platform from '@/models/platform';
import { Query } from '@/schemas/platforms/getAll';
import { getPaginationItems } from '@/utils/pagination';

type GetAllProps = {
  user_id: string;
  data: Query;
};

export const getAll = async ({ user_id, data }: GetAllProps) => {
  const { per_page, page = 1, sort, dir = 'asc' } = data;

  const filters = {
    user_id,
    is_deleted: false,
  };

  try {
    const query = Platform.find(filters);

    if (per_page) {
      const skip = (page - 1) * per_page;
      query.limit(per_page).skip(skip);
    }

    if (sort) {
      query.sort({ [sort]: dir });
    } else {
      query.sort({ created_at: 'desc' });
    }

    const [platforms, count] = await Promise.all([
      query,
      Platform.countDocuments(filters),
    ]);

    const total_pages = per_page ? Math.ceil(count / per_page) : 1;
    const pages = total_pages ? getPaginationItems(page, total_pages) : [];

    return {
      platforms,
      total_platforms: count,
      pagination: {
        current_page: page,
        total_pages,
        pages,
      },
    };
  } catch (error) {
    console.error(`GET_ALL_PLATFORM: ${error}`);
    return new Error('Failed to retrieve platforms');
  }
};
