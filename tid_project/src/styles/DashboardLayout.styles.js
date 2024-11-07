import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: 60px;
`;

export const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => theme.spacing[4]};
`;

export const NavContent = styled.div`
  container: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const NavLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

export const MainContent = styled.main`
  flex: 1;
  container: 100%;
  margin: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-right: 60px;
`;