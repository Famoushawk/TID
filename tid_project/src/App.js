import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import DashboardLayout from "./components/layout/DashboardLayout";
import Frame1 from "./pages/Frame1/Frame1";
import ProfileList from "./pages/ProfileList/ProfileList";
import Frame3 from "./pages/Frame3/Frame3";
import Frame4 from "./pages/Frame4/Frame4";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import apiClient from "./api/client";
import CreateContentPage from "./pages/CreateContent/CreateContentPage";
import Parse from "parse/dist/parse.min.js";
import DownloadBudgetTemplate from "./components/DownloadBudgetTemplate";
import SetUpGoal from "./pages/SetUpGoal/SetUpGoal";

Parse.initialize("BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P", "OJ2uQ7qSFn4eMg3y23jPPOq0wBnD49DEiITknteS");
Parse.serverURL = "https://parseapi.back4app.com";

import { fetchUser } from "./api/apiClient";

const getUserData = async () => {
  try {
    const userData = await fetchUser();
    console.log(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const checkUser = async () => {
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken) {
    try {
      console.log("Session token found:", sessionToken);
      await apiClient.get("/users/me");
      console.log("API call successful");
      return true;
    } catch (error) {
      console.error("Error in API call:", error.message);
      localStorage.removeItem("sessionToken");
      return false;
    }
  }
  console.log("No session token found");
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

  useEffect(() => {
    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated]);

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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route path="frame1" element={<Frame1 />} />
              <Route path="profile-list" element={<ProfileList />} />
              <Route path="frame3" element={<Frame3 />} />
              <Route path="frame4" element={<Frame4 />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-content" element={<CreateContentPage />} />
              <Route path="download-budget-template" element={<DownloadBudgetTemplate />} />
              <Route path="set-up-goal" element={<SetUpGoal />} />
              <Route path="expenses-diagram" element={<ExpensePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
