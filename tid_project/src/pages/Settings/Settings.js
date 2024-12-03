import React, { useState, useEffect } from 'react';
import { AuthService } from '../../api/services/AuthService';
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
  Button,
  AvatarGrid,
  AvatarOption,
  CurrentAvatar
} from './Settings.styles';

const AVATAR_OPTIONS = [
  {
    id: 'avatar1',
    url: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png'
  },
  {
    id: 'avatar2',
    url: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
  },
  {
    id: 'avatar3',
    url: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/85.png'
  }
];

const Settings = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [newPassword, setNewPassword] = useState({ current: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser({
          username: currentUser.data.username,
          email: currentUser.data.email || '',
          avatar: currentUser.data.avatar || AVATAR_OPTIONS[0].url
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getCurrentUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await AuthService.updateProfile({ 
        email: user.email,
        avatar: user.avatar
      });
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message || 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setUser({ ...user, avatar: avatarUrl });
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
      await AuthService.changePassword(newPassword.current, newPassword.new);
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setNewPassword({ current: '', new: '', confirm: '' });
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
          {user.avatar && (
            <CurrentAvatar>
              <img src={user.avatar} alt="Current avatar" />
            </CurrentAvatar>
          )}

          <FormGroup>
            <Label>Select Avatar</Label>
            <AvatarGrid>
              {AVATAR_OPTIONS.map((avatar) => (
                <AvatarOption
                  key={avatar.id}
                  isSelected={user.avatar === avatar.url}
                  onClick={() => handleAvatarSelect(avatar.url)}
                >
                  <img src={avatar.url} alt={`Avatar option ${avatar.id}`} />
                </AvatarOption>
              ))}
            </AvatarGrid>
          </FormGroup>

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