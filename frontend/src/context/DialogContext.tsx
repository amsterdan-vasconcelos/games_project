import { useState, type ReactNode } from 'react';
import { DialogContext } from '../hooks/useDialog';

type DialogProviderProps = {
  children: ReactNode;
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
