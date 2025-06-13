import { createContext, useContext } from 'react';

import type { GetAllProps } from '../context/PlatformContext';
import type { EditPlatformProps, PlatformProps } from '../types/Platform';

type PlatformContextProps = {
  getAll: ({ sort, dir }: GetAllProps) => Promise<PlatformProps[]>;
  remove: (itemId: string) => Promise<void>;
  create: (platformData: Omit<PlatformProps, '_id'>) => Promise<void>;
  update: (platformData: EditPlatformProps) => Promise<void>;
  count: number;
  error: boolean;
  loading: boolean;
};

export const PlatformContext = createContext<PlatformContextProps | undefined>(
  undefined,
);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
