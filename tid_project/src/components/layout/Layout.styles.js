import styled from 'styled-components';

// DashboardLayout styles
export const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: 60px;
`;

export const NavBar = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const NavContent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const StyledNavLink = styled.a`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-right: 60px;
`;

// NavigationBar styles
export const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing[1]};
  min-height: 100vh;
`;

// BurgerMenu styles
export const BurgerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  min-height: 48px;
  border: none;
  background: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// Settings Button styles
export const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  max-width: 40px;
  margin: ${({ theme }) => theme.spacing[4]};
  border: none;
  background: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// Add Button styles
export const AddButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
  width: 56px;
`;