import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./route/ProtectedRoute";

import Navbar from "./components/AppBar/Appbar";
import Home from "./pages/home/Home";
import Login from "./pages/singup/Login";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route for Login Page */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
          </Route>

          {/* Catch-all route to redirect to home if user is authenticated, or to login if not */}
          <Route path="*" element={<FallbackRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Public Route: Redirects to /home if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

// Fallback Route: Handles all undefined routes
const FallbackRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/" replace />;
};

// Layout for Other Pages
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "16px" }}>{children}</div>
    </>
  );
};

export default App;