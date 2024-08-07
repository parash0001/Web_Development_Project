import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add state for user role
  const [username, setUsername] = useState(null); // Add state for username
  const [email, setEmail] = useState(null); // Add state for email
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('userRole');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role); // Set the role from local storage
      setUsername(storedUsername); // Set the username from local storage
      setEmail(storedEmail); // Set the email from local storage
    }
  }, []);

  const login = (role, username, email) => {
    setIsAuthenticated(true);
    setUserRole(role); // Set the role when login is called
    setUsername(username); // Set the username when login is called
    setEmail(email); // Set the email when login is called
    localStorage.setItem('username', username); // Save username to local storage
    localStorage.setItem('email', email); // Save email to local storage
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username'); // Remove username from local storage
    localStorage.removeItem('email'); // Remove email from local storage
    sessionStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    setUserRole(null); // Clear the role on logout
    setUsername(null); // Clear the username on logout
    setEmail(null); // Clear the email on logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
