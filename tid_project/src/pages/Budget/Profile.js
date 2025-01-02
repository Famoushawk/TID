import React from "react";
import ProfileOptions from "../../components/layout/ProfileOptions.js";
import styled from "styled-components";



const profileData = [
  {
    title: "Current status",
    details: "25.000 $$",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './wallet.png'
  },
  {
    title: "Expense Tracker",
    details: "4000 $$ left",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './target.png'
  },
  {
    title: "Financial Goals",
    details: "20% complete",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './calculator.png'
  }
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