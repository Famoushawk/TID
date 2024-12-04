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
              <Link to="/frame1" component={StyledNavLink}>Frame 1</Link>
              <StyledNavLink as={Link} to="/profilelist">Profile List</StyledNavLink> {/* Updated route */}
              <Link to="/frame3" component={StyledNavLink}>Frame 3</Link>
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
