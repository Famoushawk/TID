import React from "react";
import styled from "styled-components";
import ProfileOptions from "./ProfileOptions";

const profileData = [
  {
    title: "Budget Templates",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './wallet.png'
  },
  {
    title: "Set goal for saving up",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './target.png'
  },
  {
    title: "Diagram of expenses",
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
  justify-content: flex-start;
  padding: 0 8px;
  list-style-type: none;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default Profile;
