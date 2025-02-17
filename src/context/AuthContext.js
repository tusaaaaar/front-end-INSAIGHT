// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     console.log("User data received in login function:", userData);
//     console.log("User logged in:", userData); // Should log user data
//   };

//   // Use useEffect to log the updated user state
//   useEffect(() => {
//     if (user) {
//       console.log("User state updated:", user);
//     }
//   }, [user]);

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    console.log('User logged in:', userData);
    fetchUserData(userData.username);
  };

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${encodeURIComponent(username)}`);
      const fetchedUser = response.data.user;
      if (fetchedUser) {
        setUser(fetchedUser);
        console.log('Fetched user data:', fetchedUser);
      } else {
        console.warn('User not found');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      console.log('User state updated:', user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
