import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser, saveUser, removeUser } from '../services/authService.js';
import { loginUser } from '../services/user/userServices.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const stored = await getUser();
      if (stored) setUser(stored);
      setLoading(false);
    })();
  }, []);


  const login = async (email, senha) => {
    const result = await loginUser(email, senha);
    if (result.id) {
      const userData = { email, senha, id: result.id };
      await saveUser(userData);
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
