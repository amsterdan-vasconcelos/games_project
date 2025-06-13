import { useState, type ReactNode } from 'react';

import { PlatformContext } from '../hooks/usePlatform';
import { api } from '../services/api';
import type { EditPlatformProps, PlatformProps } from '../types/Platform';

type PlatformProviderProps = {
  children: ReactNode;
};

export type GetAllProps = {
  sort?: string;
  dir?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
};

export function PlatformProvider({ children }: PlatformProviderProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getAll = async ({
    sort = 'title',
    dir,
    per_page,
    page,
  }: GetAllProps) => {
    try {
      setLoading(true);
      const response = await api.get(`/platforms`, {
        params: { sort, dir, page, per_page },
      });
      const { platforms, count } = response.data;

      setLoading(false);
      setCount(count);

      return platforms;
    } catch (error) {
      console.error('Error fetching platform:', error);
      setError(true);
      setLoading(false);
    }
  };

  const create = async (
    platformData: Omit<
      PlatformProps,
      '_id' | 'is_deleted' | 'createdAt' | 'updatedAt'
    >,
  ) => {
    try {
      setLoading(true);
      await api.post('/platforms', platformData);
      setLoading(false);
    } catch (error) {
      console.error('Error creating platform:', error);
      setError(true);
      setLoading(false);
    }
  };

  const remove = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      await api.delete(`/platforms/${itemId}`);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting platform:', error);
      setError(true);
      setLoading(false);
    }
  };

  const update = async ({
    itemId,
    platformData,
  }: EditPlatformProps): Promise<void> => {
    try {
      setLoading(true);
      await api.put(`/platforms/${itemId}`, platformData); // <-- ajuste aqui
      setLoading(false);
    } catch (error) {
      console.error('Error updating platform:', error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <PlatformContext.Provider
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
    </PlatformContext.Provider>
  );
}
