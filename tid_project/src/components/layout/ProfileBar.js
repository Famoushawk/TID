import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import styled from 'styled-components';

const ProfileSection = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing[4]};
`;

const ProfileImage = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.white};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Username = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
`;

const ProfileBar = () => {
  const [user, setUser] = useState({
    username: 'Loading...',
    avatar: null
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await apiClient.get('/users/me');
        if (response.data) {
          setUser({
            username: response.data.username,
            avatar: response.data.avatar || null
          });
        } else {
          setUser({
            username: 'Guest',
            avatar: null
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser({
          username: 'Error loading user',
          avatar: null
        });
      }
    };

    getCurrentUser();
  }, []);

  const defaultAvatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png";

  return (
    <ProfileSection>
      <ProfileImage
        src={user.avatar || defaultAvatar}
        alt={`${user.username}'s profile picture`}
        onError={(e) => {
          e.target.src = defaultAvatar;
        }}
      />
      <ProfileInfo>
        <Username>{user.username}</Username>
      </ProfileInfo>
    </ProfileSection>
  );
};

export default ProfileBar;