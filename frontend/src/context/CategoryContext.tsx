import { useState, type ReactNode } from 'react';
import { CategoryContext } from '../hooks/useCategory';
import { api } from '../services/api';
import type { CategoryProps, EditCategoryProps } from '../types/Category';

type CategoryProviderProps = {
  children: ReactNode;
};

export type GetAllProps = {
  sort?: string;
  dir?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
};

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getAll = async ({ sort, dir, per_page, page }: GetAllProps = {}) => {
    try {
      setLoading(true);
      const response = await api.get(`/categories`, {
        params: { sort, dir, page, per_page },
      });
      const categories = response.data;

      setLoading(false);
      setCount(categories.count);

      return categories.categories;
    } catch (error) {
      console.error('Error fetching category:', error);
      setError(true);
      setLoading(false);
    }
  };

  const create = async (
    categoryData: Pick<CategoryProps, 'title' | 'description'>,
  ) => {
    try {
      setLoading(true);
      await api.post('/categories', categoryData);
      setLoading(false);
    } catch (error) {
      console.error('Error creating category:', error);
      setError(true);
      setLoading(false);
    }
  };

  const remove = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      await api.delete(`/categories/${itemId}`);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError(true);
      setLoading(false);
    }
  };

  const update = async ({
    categoryData,
    itemId,
  }: EditCategoryProps): Promise<void> => {
    try {
      setLoading(true);
      await api.put(`/categories/${itemId}`, categoryData);
      setLoading(false);
    } catch (error) {
      console.error('Error updating category:', error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        getAll,
        create,
        remove,
        update,
        count,
        error,
        loading,
      }}>
      {children}
    </CategoryContext.Provider>
  );
}
