import { createContext, useContext, useState, useCallback } from 'react';
import { adminLogin } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [admin, setAdmin] = useState(null);

  const login = useCallback(async (email, password) => {
    const data = await adminLogin({ email, password });
    localStorage.setItem('portfolio_token', data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('portfolio_token');
    setToken(null);
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
