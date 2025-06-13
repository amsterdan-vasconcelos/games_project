import Category from '@/models/category';
import { Body } from '@/schemas/categories/create';

type CreateProps = {
  user_id: string;
  data: Body;
};

export const create = async ({ user_id, data }: CreateProps) => {
  try {
    const category = new Category({ user_id, ...data });

    const result = await category.save();
    return result;
  } catch (error) {
    console.error(error);
    return new Error('Failed to create category');
  }
};
