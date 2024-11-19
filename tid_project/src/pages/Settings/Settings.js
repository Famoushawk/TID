import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import {
  SettingsContainer,
  PageTitle,
  MessageBox,
  Card,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  HelpText,
  Button
} from './Settings.styles';

const Settings = () => {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUser({
          username: currentUser.get('username'),
          email: currentUser.get('email') || '',
        });
      }
    };

    getCurrentUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        currentUser.set('email', user.email);
        await currentUser.save();
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: error.message || 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (newPassword.new !== newPassword.confirm) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        await Parse.User.logIn(user.username, newPassword.current);
        currentUser.setPassword(newPassword.new);
        await currentUser.save();
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        setNewPassword({ current: '', new: '', confirm: '' });
      }
    } catch (error) {
      setMessage({ text: error.message || 'Error changing password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContainer>
      <PageTitle>User Settings</PageTitle>
      
      {message.text && (
        <MessageBox type={message.type}>
          {message.text}
        </MessageBox>
      )}

      <Card>
        <SectionTitle>Profile Information</SectionTitle>
        <form onSubmit={handleUpdateProfile}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={user.username}
              disabled
            />
            <HelpText>Username cannot be changed</HelpText>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={loading}
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </Card>

      <Card>
        <SectionTitle>Change Password</SectionTitle>
        <form onSubmit={handleChangePassword}>
          <FormGroup>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={newPassword.current}
              onChange={(e) => setNewPassword({ ...newPassword, current: e.target.value })}
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword.new}
              onChange={(e) => setNewPassword({ ...newPassword, new: e.target.value })}
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={newPassword.confirm}
              onChange={(e) => setNewPassword({ ...newPassword, confirm: e.target.value })}
              disabled={loading}
            />
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </Button>
        </form>
      </Card>
    </SettingsContainer>
  );
};

export default Settings;