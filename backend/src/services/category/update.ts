import Category from '@/models/category';
import { Body } from '@/schemas/categories/update';

type UpdateByIdProps = {
  id: string;
  data: Body;
};

export const updateById = async ({ id, data }: UpdateByIdProps) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!category) return new Error('Category not found');

    return category;
  } catch (error) {
    console.error(error);
    return new Error('Failed to update category');
  }
};
