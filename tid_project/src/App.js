import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import DashboardLayout from './components/layout/DashboardLayout';
import Budget from './pages/Budget/Budget';
import ContentPage from './pages/ContentPage/ContentPage';
import Threads from './pages/Threads/Threads';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import apiClient from './api/client';
import CreateContentPage from './pages/CreateContent/CreateContentPage';
import SingleContentPage from './pages/ContentPage/SingleContentPage';
import ProfileList from './pages/ProfileList/ProfileList';

const checkUser = async () => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    try {
      const response = await apiClient.get('/users/me');
      return true;
    } catch (error) {
      localStorage.removeItem('sessionToken');
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const result = await checkUser();
      setIsAuthenticated(result);
    };
    verify();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const result = await checkUser();
      setIsAuthenticated(result);
    };
    verify();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/Budget" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/Budget" replace />} />
              <Route path="Budget" element={<Budget />} />
              <Route path="profilelist" element={<ProfileList />} />
              <Route path="contentpage" element={<ContentPage />} />
              <Route path="Threads" element={<Threads />} />
              <Route path="settings" element={<Settings />} />
              <Route path="/create-content" element={<CreateContentPage />} />
              <Route path="/content/:type/:id" element={<SingleContentPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;