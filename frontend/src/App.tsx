import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './App.css';

import Layout from './components/Layout';
import { Login } from './pages/auth/login/Login';
import { Register } from './pages/auth/register/Register';
import { Category } from './pages/category/Category';
import { Games } from './pages/games/Games';
import { Home } from './pages/home/Home';
import { Platform } from './pages/platform/Platform';
import { requireAuth } from './services/requiredAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader={requireAuth} />
        <Route path='/games' element={<Games />} loader={requireAuth} />
        <Route path='/categories' element={<Category />} loader={requireAuth} />
        <Route path='/platforms' element={<Platform />} loader={requireAuth} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
