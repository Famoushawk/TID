import styled from 'styled-components';

export const SettingsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[2]};
  max-width: 42rem;
  margin: 0 auto;
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const MessageBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  background-color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.green100 : theme.colors.red100};
  color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.green700 : theme.colors.red700};
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  background-color: ${({ disabled, theme }) => 
    disabled ? theme.colors.gray100 : theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }
`;

export const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray500};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;