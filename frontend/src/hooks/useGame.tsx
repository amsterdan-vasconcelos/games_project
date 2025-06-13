import { createContext, useContext } from 'react';
import { type GetAllProps } from '../context/GameContext';
import type { EditGameProps, GameProps } from '../types/Game';

type GameContextProps = {
  getAll: ({ sort, dir }: GetAllProps) => Promise<GameProps[]>;
  getById: (itemId: string) => Promise<GameProps[]>;
  remove: (itemId: string) => Promise<void>;
  toggleIsFavorite: (itemId: string, isFavorite: boolean) => Promise<void>;
  create: (gameData: GameProps) => Promise<void>;
  update: (gameData: EditGameProps) => Promise<void>;
  error: boolean;
  loading: boolean;
};

export const GameContext = createContext<GameContextProps | undefined>(
  undefined,
);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
