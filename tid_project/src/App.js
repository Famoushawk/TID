import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Parse from 'parse';
import DashboardLayout from './components/layout/DashboardLayout';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3/Frame3';
import Frame4 from './pages/Frame4';
import Login from './pages/Login/Login';
import Settings from './pages/Settings';


// Move checkUser outside of App component so other components can access it
const checkUser = async () => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    try {
      await Parse.User.become(sessionToken);
      return true;
    } catch (error) {
      localStorage.removeItem('sessionToken');
      return false;
    }
  }
  return false;
};

// Protected Route Component
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
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route Component (prevents authenticated users from accessing login)
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
    return <div>Loading...</div>; // Or your loading component
  }

  if (isAuthenticated) {
    return <Navigate to="/frame1" replace />;
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
              <Route index element={<Navigate to="/frame1" replace />} />
              <Route path="frame1" element={<Frame1 />} />
              <Route path="frame2" element={<Frame2 />} />
              <Route path="frame3" element={<Frame3 />} />
              <Route path="frame4" element={<Frame4 />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;