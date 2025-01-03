import React from 'react';
import { useLocation } from 'react-router-dom';
import AddButton from './AddButton';
import BurgerMenu from './BurgerMenu';
import SettingsButton from './SettingsButton';
import { NavBarContainer } from './Layout.styles';

const NavigationBar = () => {
  const location = useLocation();

  const renderButton = () => {
    switch (location.pathname) {
      case '/frame1':
      case '/frame2':
        return <SettingsButton />;
      case '/frame3':
      case '/frame4':
        return <AddButton />;
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