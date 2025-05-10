import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUser, saveUser, removeUser } from '../services/authService.js';
import { loginUser } from '../services/user/userServices.js';
import { loginAdmin } from '../services/admin/adminServices.js';
import { getAdmin, saveAdmin, removeAdmin } from '../services/adminAuthService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const storedUser = await getUser();
      if (storedUser) setUser(storedUser);

      const storedAdmin = await getAdmin();
      if (storedAdmin) setAdmin(storedAdmin);

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

  const loginAdm = async (email, senha) => {
    const result = await loginAdmin(email, senha);
    if (result.id) {
      const adminData = { email, senha, id: result.id };
      await saveAdmin(adminData);
      setAdmin(adminData);
      return { success: true };
    }
    return { success: false, message: result.error };
  };

  const logout = async () => {
    await removeUser();
    setUser(null);
  };

  const logoutAdmin = async () => {
    await removeAdmin();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ user, admin, loading, login, logout, loginAdm, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
