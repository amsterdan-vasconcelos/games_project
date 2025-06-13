import { useState, type ReactNode } from 'react';
import { GameContext } from '../hooks/useGame';
import { api } from '../services/api';
import type { EditGameProps, GameProps } from '../types/Game';

type GameProviderProps = {
  children: ReactNode;
};

export type GetAllProps = {
  sort?: string;
  dir?: 'asc' | 'desc';
};

export function GameProvider({ children }: GameProviderProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAll = async ({ sort = 'title', dir }: GetAllProps) => {
    try {
      setLoading(true);
      const response = await api.get('/game', {
        params: { sort, dir },
      });

      const games = response.data;

      setLoading(false);

      return games;
    } catch (error) {
      console.error('Error fetching game:', error);
      setError(true);
      setLoading(false);
    }
  };

  const create = async (gameData: GameProps) => {
    try {
      setLoading(true);
      await api.post('/game', gameData);
      setLoading(false);
    } catch (error) {
      console.error('Error creating game:', error);
      setError(true);
      setLoading(false);
    }
  };

  const remove = async (itemId: string): Promise<void> => {
    try {
      setLoading(true);
      await api.delete(`/game/${itemId}`);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting game:', error);
      setError(true);
      setLoading(false);
    }
  };

  const getById = async (itemId: string) => {
    try {
      setLoading(true);
      const game = await api.get(`/game/${itemId}`);
      setLoading(false);

      return game.data;
    } catch (error) {
      console.error('Error deleting game:', error);
      setError(true);
      setLoading(false);
    }
  };

  const update = async ({ gameData, itemId }: EditGameProps): Promise<void> => {
    try {
      setLoading(true);
      await api.put(`/game/${itemId}`, { gameData });
      setLoading(false);
    } catch (error) {
      console.error('Error updating game:', error);
      setError(true);
      setLoading(false);
    }
  };

  const toggleIsFavorite = async (
    itemId: string,
    isFavorite: boolean,
  ): Promise<void> => {
    try {
      setLoading(true);

      await api.patch(`/game/${itemId}`, { favorite: isFavorite });

      setLoading(false);
    } catch (error) {
      console.error('Error setting game favorite:', error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        getAll,
        getById,
        create,
        remove,
        update,
        toggleIsFavorite,
        error,
        loading,
      }}>
      {children}
    </GameContext.Provider>
  );
}
