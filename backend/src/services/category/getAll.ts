import Category from '@/models/category';
import { Query } from '@/schemas/categories/getAll';
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
    const query = Category.find(filters);

    if (per_page) {
      const skip = (page - 1) * per_page;
      query.limit(per_page).skip(skip);
    }

    if (sort) {
      query.sort({ [sort]: dir });
    } else {
      query.sort({ created_at: 'desc' });
    }

    const [categories, count] = await Promise.all([
      query,
      Category.countDocuments(filters),
    ]);

    const total_pages = per_page ? Math.ceil(count / per_page) : 1;
    const pages = total_pages ? getPaginationItems(page, total_pages) : [];

    return {
      categories,
      total_categories: count,
      pagination: {
        current_page: page,
        total_pages,
        pages,
      },
    };
  } catch (error) {
    console.error(`GET_ALL_CATEGORIES: ${error}`);
    return new Error('Failed to get categories');
  }
};
