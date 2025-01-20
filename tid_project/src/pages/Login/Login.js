import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../api/services/AuthService';
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

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        // Validate passwords match
        if (credentials.password !== credentials.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          throw new Error('Please enter a valid email address');
        }

        await AuthService.signup(
          credentials.username,
          credentials.email,
          credentials.password
        );
      } else {
        await AuthService.login(credentials.username, credentials.password);
      }
      navigate('/Budget');
    } catch (error) {
      setError(error.message || `${isSignup ? 'Signup' : 'Login'} failed`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setCredentials({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>{isSignup ? 'Sign Up' : 'Login'}</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Username"
              required
            />
          </FormGroup>

          {isSignup && (
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Email"
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Password"
              required
            />
          </FormGroup>

          {isSignup && (
            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
                required
              />
            </FormGroup>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
          </Button>
        </form>

        <SignUpText>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <SignUpButton type="button" onClick={toggleMode}>
            {isSignup ? 'Login' : 'Sign Up'}
          </SignUpButton>
        </SignUpText>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;