export type CategoryProps = {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
};

export type EditCategoryProps = {
  category: CategoryProps;
  categoryData: Pick<CategoryProps, 'title' | 'description'>;
  itemId: string;
};

export type EditCategoryWithOnCreatedProps = {
  onCreated: () => void;
  category: CategoryProps;
}