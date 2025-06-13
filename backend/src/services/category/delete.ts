import Category from '@/models/category';

export const deleteById = async (id: string) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: { is_deleted: true } },
      { new: true, runValidators: true },
    );

    if (!category) return new Error('Category not found');

    return category._id;
  } catch (error) {
    console.error(error);
    return new Error('Failed to delete category');
  }
};
