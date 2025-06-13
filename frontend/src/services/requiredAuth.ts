import { redirect } from 'react-router-dom';

export function requireAuth() {
  const isLoggedIn = Boolean(localStorage.getItem('loggedin')) || false;

  if (!isLoggedIn) {
    return redirect('/login?message=You must log in first');
  }

  return null;
}
