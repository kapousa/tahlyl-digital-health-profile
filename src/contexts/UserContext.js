// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE_URL}/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (accessToken) => {
    localStorage.setItem('access_token', accessToken);
    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_BASE_URL}/users/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data after login');
      }

      const userData = await response.json();
      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};