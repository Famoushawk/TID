import { WhiteBackground } from '../../components/layout/Layout.styles';
import React from 'react';
import Profile from './Profile';

const ProfileList = ({ profiles = [] }) => {
  return (
    <WhiteBackground>
      {profiles.length > 0 ? (
        profiles.map((profile, index) => <Profile key={index} {...profile} />)
      ) : (
        <p>No profiles available</p>
      )}
    </WhiteBackground>
  );
};

export default ProfileList;
