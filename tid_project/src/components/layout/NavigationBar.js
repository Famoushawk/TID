import React from 'react';
import { useLocation } from 'react-router-dom';
import AddButton from './AddButton';
import BurgerMenu from './BurgerMenu';
import SettingsButton from './SettingsButton';
import { NavBarContainer } from './Layout.styles';

const NavigationBar = ({ onAddButtonClick }) => {
  const location = useLocation();

  const renderButton = () => {
    switch (location.pathname) {
      case '/frame1':
      case '/frame2': // Ensure this matches the actual route
      case '/frame4':
      case '/Threads': // Added '/Threads' as in previous code
        return <SettingsButton />;
      case '/frame3':
        return <AddButton onClick={onAddButtonClick} />;
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
