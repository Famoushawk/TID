import styled from 'styled-components';

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
