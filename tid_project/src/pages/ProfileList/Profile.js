import React from "react";
import ProfileOptions from "./ProfileOptions"; 
import styled from "styled-components";
import { AuthService } from '../../api/services/AuthService'; 
const profileData = [
  {
    title: "Current status",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "/api/placeholder/80/80", 
  },
  {
    title: "Expense Tracker",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "/api/placeholder/80/80", 
  },
  {
    title: "Financial Goals",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "/api/placeholder/80/80", 
  },
];

const Profile = () => {
  return (
    <ListContainer>
      {profileData.map((item, index) => (
        <ProfileOptions key={index} {...item} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.ul`
  display: flex;
  margin-top: 4px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  padding: 0 8px;
  list-style-type: none;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default Profile;
