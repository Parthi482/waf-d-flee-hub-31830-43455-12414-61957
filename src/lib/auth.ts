// Simple client-side authentication
// NOTE: This is for demonstration only. For production, use proper backend authentication.

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin@123'
};

export const login = (username: string, password: string): boolean => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};
