import { createContext, useContext } from 'react';

type DialogContextProps = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextProps | undefined>(
  undefined,
);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a DialogProvider');
  }
  return context;
};
