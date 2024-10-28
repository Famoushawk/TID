import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="space-x-4">
            <Link to="/frame1" className="hover:text-gray-300">Frame 1</Link>
            <Link to="/frame2" className="hover:text-gray-300">Frame 2</Link>
            <Link to="/frame3" className="hover:text-gray-300">Frame 3</Link>
            <Link to="/frame4" className="hover:text-gray-300">Frame 4</Link>
            <button 
              onClick={() => navigate('/login')} 
              className="hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;