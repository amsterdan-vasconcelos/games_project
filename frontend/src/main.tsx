import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import { CategoryProvider } from './context/CategoryContext.tsx';
import { DialogProvider } from './context/DialogContext.tsx';
import { GameProvider } from './context/GameContext.tsx';
import { PlatformProvider } from './context/PlatformContext.tsx';
import { SidebarProvider } from './context/SidebarContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DialogProvider>
        <SidebarProvider>
          <GameProvider>
            <CategoryProvider>
              <PlatformProvider>
                <ToastContainer position='top-right' autoClose={3000} />
                <App />
              </PlatformProvider>
            </CategoryProvider>
          </GameProvider>
        </SidebarProvider>
      </DialogProvider>
    </UserProvider>
  </StrictMode>,
);