import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3';
import Frame4 from './pages/Frame4';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/Login" replace />} />
          <Route path="frame1" element={<Frame1 />} />
          <Route path="frame2" element={<Frame2 />} />
          <Route path="frame3" element={<Frame3 />} />
          <Route path="frame4" element={<Frame4 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
