import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import ProfileBar from './ProfileBar';
import NavigationBar from './NavigationBar';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div>
    <NavigationBar />
    <div className="min-h-screen flex flex-col bg-primary mr-[60px]">
      <nav className="bg-primary text-black p-4">
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
      <ProfileBar />
      <main className="flex-1 container m-5 p-2 rounded-lg mr-[60px]">
        <Outlet />
      </main>
    </div>
    </div>
  );
};

export default DashboardLayout;