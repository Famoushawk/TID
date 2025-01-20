import React from 'react';
import { useLocation } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import SettingsButton from './SettingsButton';
import { NavBarContainer } from './Layout.styles';
import AddButtonContentPage from './AddButtonContentPage';

const NavigationBar = ({ onAddButtonClick, onBurgerMenuClick }) => {
  const location = useLocation();

  const renderButton = () => {
    switch (location.pathname) {
      case '/Budget':
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
      <BurgerMenu onClick={onBurgerMenuClick} />
      {renderButton()}
    </NavBarContainer>
  );
};

export default NavigationBar;