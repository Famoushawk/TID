import React from 'react';
import { useLocation } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import SettingsButton from './SettingsButton';
import { NavBarContainer } from './Layout.styles';
import AddButtonContentPage from './AddButtonContentPage';

const NavigationBar = ({ onAddButtonClick }) => {
  const location = useLocation();

  const renderButton = () => {
    switch (location.pathname) {
      case '/frame1':
      case '/frame2':
      case '/Threads':
        return <SettingsButton />;
      case '/contentpage':
        return <AddButtonContentPage onClick={onAddButtonClick} />;
      default:
        return null;
    }
  };

  return (
    <NavBarContainer>
      <BurgerMenu />
      {renderButton()}
    </NavBarContainer>
  );
};

export default NavigationBar;