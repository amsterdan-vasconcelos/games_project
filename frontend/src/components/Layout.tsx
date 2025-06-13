import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;