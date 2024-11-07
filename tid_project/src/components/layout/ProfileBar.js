import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import styled from 'styled-components';

const ProfileSection = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing[1]};
`;

const ProfileImage = styled.img`
  width: 84px;
  aspect-ratio: 1.05;
  border-radius: ${({ theme }) => theme.borderRadius.full};
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
  const [username, setUsername] = useState('Loading...');

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current();
        if (currentUser) {
          setUsername(currentUser.get('username'));
        } else {
          setUsername('Guest');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUsername('Error loading user');
      }
    };

    getCurrentUser();
  }, []);

  return (
    <ProfileSection>
      <ProfileImage
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
        alt="Profile picture"
      />
      <ProfileInfo>
        <Username>{username}</Username>
      </ProfileInfo>
    </ProfileSection>
  );
};

export default ProfileBar;