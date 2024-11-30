import React from 'react';
import { AddButtonContainer, IconWrapper } from './Layout.styles';
import { useNavigate } from "react-router-dom";


const AddButton = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/create-content");
  };

  return (
  <AddButtonContainer onClick = {handleAddClick}>
    <IconWrapper>
      <img 
        src="https://cdn.icon-icons.com/icons2/916/PNG/512/Plus_icon-icons.com_71848.png" 
        alt="Add" 
        style={{ width: '24px', height: '24px' }}
      />
    </IconWrapper>
  </AddButtonContainer>
);
};

export default AddButton;