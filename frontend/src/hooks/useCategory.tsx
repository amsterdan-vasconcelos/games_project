import { createContext, useContext } from 'react';

import type { GetAllProps } from '../context/PlatformContext';
import type { CategoryProps, EditCategoryProps } from '../types/Category';

type CategoryContextProps = {
  getAll: ({
    sort,
    dir,
    page,
    per_page,
  }?: GetAllProps) => Promise<CategoryProps[]>;
  remove: (itemId: string) => Promise<void>;
  create: (
    categoryData: Pick<CategoryProps, 'title' | 'description'>,
  ) => Promise<void>;
  update: (categoryData: EditCategoryProps) => Promise<void>;
  count: number;
  error: boolean;
  loading: boolean;
};

export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined,
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
