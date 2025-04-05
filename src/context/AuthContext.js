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

//working version

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = async (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     console.log('User logged in:', userData);
//     // Use _id from the user object returned by the backend
//     fetchUserData(userData._id);
//   };

//   const fetchUserData = async (userId) => {
//     try {
//       console.log("In useAuth, fetching user data for ID:", userId);
//       const response = await axios.get(`http://localhost:5000/users/${encodeURIComponent(userId)}`);
//       const fetchedUser = response.data.user;
  
//       if (fetchedUser) {
//         // If the user has a profile picture ID, generate the URL
//         if (fetchedUser.profilePicture) {
//           fetchedUser.profilePictureUrl = `http://localhost:5000/files/${fetchedUser.profilePicture}`;
//         } else {
//           fetchedUser.profilePictureUrl = "/default-avatar.png"; // Fallback
//         }
  
//         setUser(fetchedUser);
//         console.log("Fetched user data with profile picture:", fetchedUser);
//       } else {
//         console.warn("User not found");
//       }
//     } catch (error) {
//       console.error("Failed to load user data:", error);
//     }
//   };
  

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   useEffect(() => {
//     if (user) {
//       console.log('User state updated:', user);
//     }
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Restore user from sessionStorage on page load
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      fetchUserData(parsedUser._id);
    }
  }, []);

  const login = async (userData) => {
    setIsAuthenticated(true);
    setUser(userData);

    // Store user data in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(userData));

    fetchUserData(userData._id);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${encodeURIComponent(userId)}`);
      const fetchedUser = response.data.user;
  
      if (fetchedUser) {
        fetchedUser.profilePictureUrl = fetchedUser.profilePicture
          ? `http://localhost:5000/files/${fetchedUser.profilePicture}`
          : "/default-avatar.png";
  
        setUser(fetchedUser);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem("user"); // Clear session storage on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
