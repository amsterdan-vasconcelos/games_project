
import { createContext, useContext } from 'react';

import type { JwtPayload } from '../context/UserContext';
import type { UserProps } from '../types/User';

type UserContextProps = {
  user: JwtPayload | undefined;
  login: (data: Pick<UserProps, 'email' | 'password'>) => Promise<void>;
  register: (data: UserProps) => Promise<void>;
  logout: () => void;
  error: boolean;
  loading: boolean;
};

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
