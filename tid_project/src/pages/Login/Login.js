import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Parse from 'parse';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import styled from 'styled-components';
import {
  LoginContainer,
  LoginBox,
  Title,
  ErrorMessage,
  FormGroup,
  Label,
  Input,
  Button,
  SignUpText,
  SignUpButton
} from './styles';

// Additional styled components for the dialog
const DialogButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`;

const DialogForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Login = () => {
  // State management
  const [formState, setFormState] = useState({
    login: {
      username: '',
      password: ''
    },
    signUp: {
      username: '',
      password: '',
      email: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const user = await Parse.User.logIn(formState.login.username, formState.login.password);
      localStorage.setItem('sessionToken', user.getSessionToken());
      navigate('/frame1');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const user = new Parse.User();
      user.set("username", formState.signUp.username);
      user.set("password", formState.signUp.password);
      user.set("email", formState.signUp.email);
      
      await user.signUp();
      localStorage.setItem('sessionToken', user.getSessionToken());
      setIsModalOpen(false);
      navigate('/frame1');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes for login form
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      login: {
        ...prev.login,
        [name]: value
      }
    }));
  };

  // Handle input changes for signup form
  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      signUp: {
        ...prev.signUp,
        [name]: value
      }
    }));
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formState.login.username}
              onChange={handleLoginInputChange}
              disabled={isLoading}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formState.login.password}
              onChange={handleLoginInputChange}
              disabled={isLoading}
              required
            />
          </FormGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Login'}
          </Button>
        </form>
        
        <SignUpText>
          Not yet signed up?{' '}
          <SignUpButton type="button" onClick={() => setIsModalOpen(true)}>
            Create an account
          </SignUpButton>
        </SignUpText>
      </LoginBox>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
          </DialogHeader>
          
          <DialogForm onSubmit={handleSignUp}>
            <FormGroup>
              <Label htmlFor="signUpUsername">Username</Label>
              <Input
                id="signUpUsername"
                name="username"
                type="text"
                value={formState.signUp.username}
                onChange={handleSignUpInputChange}
                disabled={isLoading}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="signUpEmail">Email</Label>
              <Input
                id="signUpEmail"
                name="email"
                type="email"
                value={formState.signUp.email}
                onChange={handleSignUpInputChange}
                disabled={isLoading}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="signUpPassword">Password</Label>
              <Input
                id="signUpPassword"
                name="password"
                type="password"
                value={formState.signUp.password}
                onChange={handleSignUpInputChange}
                disabled={isLoading}
                required
              />
            </FormGroup>
            
            <DialogFooter>
              <DialogButtonWrapper>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Sign Up'}
                </Button>
                <Button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </DialogButtonWrapper>
            </DialogFooter>
          </DialogForm>
        </DialogContent>
      </Dialog>
    </LoginContainer>
  );
};

export default Login;