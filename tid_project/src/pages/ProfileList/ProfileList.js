import { WhiteBackground } from '../../components/layout/Layout.styles';
import React from 'react';
import Profile from './Profile';

const ProfileList = ({ children }) => {
  return (
    <WhiteBackground>
      {children || <Profile />}
    </WhiteBackground>
  );
};

export default ProfileList;
