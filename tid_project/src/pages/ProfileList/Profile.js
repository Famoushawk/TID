import React from "react";
import ProfileOptions from "./ProfileOptions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const profileData = [
  {
    title: "Download budget template",
    description: "Click to download a budget template.",
    imageUrl: './wallet.png',
    type: "download",
    fileUrl: '/path/to/budget-template.xlsx'
  },
  {
    title: "Set goal for saving up",
    description: "Click to set up a saving goal.",
    imageUrl: './target.png',
    type: "goal"
  },
  {
    title: "Diagram of expenses",
    description: "A visual representation of your expenses",
    imageUrl: './calculator.png',
    type: "diagram"
  }
];

const Profile = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.type === "download") {
      navigate('/downloadbudgetexpense')
    }
  }
  return (
    <ListContainer>
      {profileData.map((item, index) => (
        <li key={index} onClick={() => handleClick(item)}>
          <ProfileOptions {...item} />
        </li>
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
