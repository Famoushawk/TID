import React, { useState } from 'react';
import Parse from 'parse';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ProfileBar from './ProfileBar';
import NavigationBar from './NavigationBar';
import {
  DashboardContainer,
  NavBar,
  NavContent,
  NavTitle,
  NavLinks,
  StyledNavLink,
  MainContent
} from './Layout.styles';

const DashboardLayout = () => {
  const [isNewThreadDialogOpen, setIsNewThreadDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      localStorage.removeItem('sessionToken');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <NavigationBar onAddButtonClick={() => setIsNewThreadDialogOpen(true)} />
      <DashboardContainer>
        <NavBar>
          <NavContent>
            <NavTitle>Dashboard</NavTitle>
            <NavLinks>
              <Link to="/frame1" component={StyledNavLink}>Frame 1</Link>
              <Link to="/frame2" component={StyledNavLink}>Frame 2</Link>
              <Link to="/frame3" component={StyledNavLink}>Frame 3</Link>
              <Link to="/frame4" component={StyledNavLink}>Frame 4</Link>
              <StyledNavLink as="button" onClick={handleLogout}>
                Logout
              </StyledNavLink>
            </NavLinks>
          </NavContent>
        </NavBar>
        <ProfileBar />
        <MainContent>
          <Outlet />
        </MainContent>
      </DashboardContainer>
    </div>
  );
};

export default DashboardLayout;