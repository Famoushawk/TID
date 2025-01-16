import React from 'react';
import { BurgerButton } from './Layout.styles';

const BurgerMenu = ({ onClick }) => (
  <BurgerButton onClick={onClick}>
    <img
      src="https://cdn-icons-png.flaticon.com/128/5358/5358649.png"
      alt="Menu"
      style={{ width: '24px', height: '24px' }}
    />
  </BurgerButton>
);

export default BurgerMenu;