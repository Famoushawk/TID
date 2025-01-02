import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ProfileBar from './ProfileBar';
import NavigationBar from './NavigationBar';
import { AuthService } from '../../api/services/AuthService';
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
      await AuthService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
              <Link to="/Budget" component={StyledNavLink}>Budget</Link>
              <Link to="/profilelist" component={StyledNavLink}>Profile List</Link>
              <Link to="/contentpage" component={StyledNavLink}>Content</Link>
              <Link to="/Threads" component={StyledNavLink}>Threads</Link>
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