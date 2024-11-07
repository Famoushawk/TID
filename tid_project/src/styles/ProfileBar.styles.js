import styled from 'styled-components';

export const ProfileContainer = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

export const ProfileImage = styled.img`
  width: 84px;
  aspect-ratio: 1.05;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Username = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
`;