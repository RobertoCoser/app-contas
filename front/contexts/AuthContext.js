import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storagedUser = await AsyncStorage.getItem('user');
      const storagedToken = await AsyncStorage.getItem('token');

      if (storagedUser && storagedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const signIn = async (email, senha) => {
    const res = await api.post('/auth/login', { email, senha });
    setUser(res.data.usuario);

    await AsyncStorage.setItem('user', JSON.stringify(res.data.usuario));
    await AsyncStorage.setItem('token', res.data.token);

    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}