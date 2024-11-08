import React from "react";
import styled from "styled-components";
import ProfileOptions from "./ProfileOptions";


const profileData = [
  {
    title: "Budget Templates",
    details: "25.000 $$",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './wallet.png'
  },
  {
    title: "Set goal for saving up",
    details: "4000 $$ left",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './calculator.png'
  },
  {
    title: "Diagram of expenses",
    details: "20% complete",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './target.png'
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